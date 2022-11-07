




<script>
    import { store } from '$lib/store/cart.js'
    import { user, student } from '$lib/store/user.js'
    import PocketBase from 'pocketbase';

    const client = new PocketBase('https://bnet.fly.dev');


    const getMeal = () => {
        const d = new Date();
        let hour = d.getHours();
        let meal = "break fast"
        if (8 < (+hour) && (+hour) < 10) {
            meal = "brunch"
        }
        if (10 < (+hour) && (+hour) < 13) {
            meal = "lunch"
        }
        if (13 < (+hour) && (+hour) < 16) {
            meal = "tea"
        }
        if (16 < (+hour) && (+hour) < 18) {
            meal = "supper"
        }
        return meal
    }

    async function addOrderFood(food) {
        const filter = `created >= "2022-01-01 00:00:00" && committed = ${false} && student_id = "${$student.id}" && food_id = "${food.id}"`
        const resultList = await client.records.getList('orders_list', 1, 2, {
            filter,
        });
        
        if (resultList.items.length > 0) {
            let update = resultList.items[0]
            update.quantity += 1
            update.total = (food.price*update.quantity)
            update.meal = getMeal()
            const update_record = await client.records.update('orders_list', update.id , update);
            // console.log(filter,resultList)
            return update_record
        } else {
            let data = {
                "food_id": food.id,
                "name": food.name,
                "price": food.price,
                "quantity": 1,
                "total": (food.price),
                "student_id": $student.id,
                "order_id": null,
                "committed": false,
                "meal": getMeal()
            };

            
            const new_record = await client.records.create('orders_list', data);
            // console.log("new",new_record)
            return new_record
        }
        
        
    }

    async function removeOrderFood(food) {
        const filter = `created >= "2022-01-01 00:00:00" && committed = ${false} && student_id = "${$student.id}" && food_id = "${food.id}"`
        const resultList = await client.records.getList('orders_list', 1, 2, {
            filter,
        });
        let update = {quantity:0}
        if (resultList.items.length > 0) {
            update = resultList.items[0]
            update.quantity -= 1
            update.total = (food.price*update.quantity)
            update.meal = getMeal()
            if (update.quantity > 0) {
                const update_record = await client.records.update('orders_list', update.id , update);
                return update_record
            } else {
                await client.records.delete('orders_list', update.id);
            }
            return update
        } 
        return update
        
    }


    export let clickable;
    export let foody;
    let quantity = 0
    let total = 0

    const addCart = async (food_obj) => {
        const record = await addOrderFood(food_obj)
        quantity = record.quantity
        const filter = `created >= "2022-01-01 00:00:00" && committed = ${false} && student_id = "${$student.id}"`
        const resultList = await client.records.getList('orders_list', 1, 20, {
            filter,
        });

        const setStoreCart = async() => {
            store.set({
                ...$store,
                orders:resultList.items
            })
        }
        await setStoreCart()
        const getTotal = () => {
            let total = 0
            $store.orders.forEach((item)=>{
                total += (+item.price) * (+item.quantity)
            })
            return total
        }
        const setStoreTotal = async() => {
            store.set({
                ...$store,
                total:getTotal()
            })
        }
        await setStoreTotal()

    }


    const removeCart = async (food_obj) => {
        const record = await removeOrderFood(food_obj)
        quantity = record.quantity
        const filter = `created >= "2022-01-01 00:00:00" && committed = ${false} && student_id = "${$student.id}"`
        const resultList = await client.records.getList('orders_list', 1, 20, {
            filter,
        });

        const setStoreCart = async() => {
            store.set({
                ...$store,
                orders:resultList.items
            })
        }
        await setStoreCart()
        const getTotal = () => {
            let total = 0
            $store.orders.forEach((item)=>{
                total += (+item.price) * (+item.quantity)
            })
            return total
        }
        const setStoreTotal = async() => {
            store.set({
                ...$store,
                total:getTotal()
            })
        }
        await setStoreTotal()

    }
    



</script>

<div class="btn-group">
    <button on:click={()=>{
        if ($student.id) {     
            removeCart(foody)
        }
    }}>-</button>
    <button>{quantity}</button>
    <button on:click={()=>{
        if ($student.id) {
            addCart(foody)
        }
    }}>+</button>
</div>




<style>
    .btn-group button {
        background-color: #04AA6D; /* Green background */
        border: 1px solid green; /* Green border */
        color: white; /* White text */
        padding: 10px 24px; /* Some padding */
        cursor: pointer; /* Pointer/hand icon */
        float: left; /* Float the buttons side by side */
    }
    
    /* Clear floats (clearfix hack) */
    .btn-group:after {
        content: "";
        clear: both;
        display: table;
    }
    
    .btn-group button:not(:last-child) {
        border-right: none; /* Prevent double borders */
    }
    
    /* Add a background color on hover */
    .btn-group button:hover {
        background-color: #3e8e41;
    }
    </style>
