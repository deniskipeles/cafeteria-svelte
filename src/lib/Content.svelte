<script>
    import { getContext } from 'svelte';
    import Dialog from './Dialog.svelte';
    import { store } from './store/cart.js';
    import { user } from './store/user.js';
    import { order } from './store/order.js';

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

        const data = {
            date: new Date(),
            student_id:$user.id,
            order_for_student_id:$user.id,
            meal: getMeal()
        };
    
        const record = await client.records.create('orders', data);
        order.set(record)
      return record;
        
    }


    const deleteOrder = async() => {
        await client.records.delete('orders', $order.id);
    }
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
          deleteOrder()
      }
      
      const onOkay = (text) => {
          name = text;
          status = 1;
      }
  
    const showDialog = () => {
        createOrder()
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
  
  <section>
      
      <button on:click={showDialog}>Cart {$store.total}</button>
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