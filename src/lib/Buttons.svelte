




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

    async function orderFood(food) {
        
        const resultList = await client.records.getList('orders_list', 1, 2, {
            filter: `(created >= "2022-01-01 00:00:00" && committed = "${false}" && student_id = "${$user.id}" && food_id = "${food.id}")`,
        });
        console.log(resultList)
        if (resultList.items.length > 0) {
            let update = resultList.items[0]
            update.quantity += 1
            update.total = (food.price*update.quantity)
            update.meal = getMeal()
            const update_record = await client.records.update('orders_list', update.id , update);

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

            console.log(data)

            const new_record = await client.records.create('orders_list', data);
            return new_record
        }
        
        
    }


    export let clickable;
    export let foody;
    let quantity = 0
    let total = 0

    const addCart = (food_obj) => {
        let cart = $store.orders;
        const obj = orderFood(food_obj)
        // const obj = {
        //     name:food_obj.name,
        //     id:food_obj.id,
        //     price:food_obj.price,
        //     quantity:1,
        // }
        const exist = cart.find(item=>item.id==food_obj.id)
        if (exist != null && exist != undefined) {
            cart = cart.filter(item=>item.id != exist.id)
            cart = [...cart,obj]
        } else {
            cart = [...cart,obj]
        }

        
        store.set({
            ...$store,
            orders:cart
        })

        
        const getTotal = () => {
            let total = 0
            $store.orders.forEach((item)=>{
                total += (+item.price) * (+item.quantity)
            })
            return total
        }
        
        store.set({
            ...$store,
            total:getTotal()
        })


        console.log($store.orders)
    }
    



</script>

<div class="btn-group">
    <button>-</button>
    <button>{quantity}</button>
    <button on:click={()=>addCart(foody)}>+</button>
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
