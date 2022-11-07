<script>
    import { getContext } from 'svelte';
    import Dialog from './Dialog.svelte';
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


    // const deleteOrder = async(order) => {
    //     await client.records.delete('orders', $order.id);
    // }
    const { open } = getContext('simple-modal');
      
      let opening = false;
      let opened = false;
      let closing = false;
      let closed = false;

      let name;
      let status = 0;
      
      const onCancel = (text) => {
          name = '';
          status = -1;
        //   deleteOrder()
      }
      
      const onOkay = (text) => {
          name = text;
          status = 1;
          if ($store.orders.length > 0) {
              createOrder()
            
          }
      }
  
    const showDialog = () => {
        // createOrder()
          open(
              Dialog,
              {
                  message: "What is your name?",
                  hasForm: true,
                  onCancel,
                  onOkay
              },
              {
                  closeButton: false,
              closeOnEsc: false,
              closeOnOuterClick: false,
              }
        );
      };
  </script>
  






  <svelte:head>
    <!-- head content -->
    <link href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min.js"></script>
    <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
    
</svelte:head>
  <section>
      
      <button class="btn btn-large btn-info" on:click={showDialog}>Cart {$store.total}</button>
  </section>
  
  <style>
      section {
          padding-top: 0.5em;
      }
      
      #state {
          position: absolute;
          top: 0;
          right: 0;
          opacity: 0.53;
          font-size: 0.8em;
      }
  </style>