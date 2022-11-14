<script>
	import Receipt from './Receipt.svelte';
    import { Button, Modal } from 'flowbite-svelte'
    import { store } from './store/cart.js';
    import { student } from './store/user.js';
    
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
    async function createOrder() {

        const food_items = $store.orders.map((item)=>{

            return {
                "id": item.id,
                "created": item.created,
                "quantity": item.quantity,
                "total": item.total,
                "name": item.name,
                "price": item.price
            }
        })

        var val = Math.floor(1000 + Math.random() * 90000);
        console.log(val,$student.admission)
        const data = {
            date: new Date(),
            s_number:val,
            student_id:$student.id,
            commit:false,
            total:$store.total,
            order:food_items,
            order_for_student_id:$student.id,
            meal: getMeal(),
            reg_number:$student.admission
        };
    
        const record = await client.records.create('orders', data);
        if(record.id){
            const updateList =async()=>{
                $store.orders.forEach(async(data)=>{
                    data.committed = true
                    data.order_id = record.id
                    await client.records.update('orders_list', data.id, data);
                })
                store.set({
                    ...$store,
                    orders:[],
                    total:0
                })

            }
            updateList()
            store.set({
                    ...$store,
                    orders:[],
                    total:0
                })
        }
        // order.set(record)
        // console.log(record)
        return record;
    }


    const onOkay = (text) => {
          if ($store.orders.length > 0) {
              createOrder()
            
          }
    }
    let defaultModal = false;
  </script>
  
  <Button on:click={() => defaultModal = true}>Cart {$store.total}</Button>
  <Modal title="Terms of Service" bind:open={defaultModal} autoclose>
    <Receipt/>
    <svelte:fragment slot='footer'>
      <Button on:click={() => onOkay()}>Book The Meal Ticket</Button>
      <Button color="alternative">Decline</Button>
    </svelte:fragment>
  </Modal>