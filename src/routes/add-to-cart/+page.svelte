
<svelte:head>
    <title>
        Adding The Available Food To Cart Page. 
    </title>
</svelte:head>

<script>
    import { ButtonGroup, Button } from 'flowbite-svelte';
    import { Card, Toggle } from "flowbite-svelte";

    import { afterUpdate, onMount } from "svelte";
    import { store } from '$lib/store/cart.js'
    import { user, student } from '$lib/store/user.js'
    import PocketBase from 'pocketbase';
    import { goto } from '$app/navigation';
    

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
        // console.log($store.orders)
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
    

    let vCard = false;
    export let data;
    let    food_items = []
    if(data.food_items){
        food_items = data.food_items.items
    }


    onMount(() => {
		// ...the DOM is now in sync with the data
        const url = location.pathname
        // console.log(url)
        if ($user.id == null || $user.id == undefined) {
            let result = url.includes("/add-to-cart");
            if (result) {
                goto('/login',{replaceState:true})
            }
        }
	});

    afterUpdate(()=>{
        const url = location.pathname
        goto(url,{replaceState:true})
    })

    function outerFxn(obj) {
        let orders = $store.orders
        let len = orders.filter(item=>{
            return item.food_id == obj.id
        })
        if (len.length > 0) {
            return len[0].quantity
        }
        return 0
    }
</script>






{#each food_items as item}
    <div>
        <Card img={`${data.url}/api/files/${item["@collectionId"]}/${item.id}/${item.image}?thumb=150x150`} reverse={vCard}>
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
            {#if item.other_names}
                 {#each item.other_names as names}
                     {names} &nbsp;
                 {/each}
            {:else}
                 not provided
            {/if}
        </p>


        <ButtonGroup>
            <Button on:click={async()=>{
                if ($student.id) { 
                    console.log(item)    
                    await removeCart(item)
                }
            }} outline color="red">
            <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2 text-blue-500 dark:text-red-500"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg> -->
            - Remove
            </Button>
            <Button outline color="dark">
            {outerFxn(item)}
            </Button>
            <Button on:click={async()=>{
                if ($student.id) { 
                    console.log(item)    
                    await addCart(item)
                }
            }} outline color="dark">
            <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2 text-blue-500 dark:text-red-500"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" /></svg> -->
            + Add
            </Button>
        </ButtonGroup>
        </Card>
    </div>
    <br>
{/each}




