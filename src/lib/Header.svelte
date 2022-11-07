

<svelte:head>
    <!-- head content -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    
    <!-- head content -->
    <link href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min.js"></script>
    <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
    
</svelte:head>







<div class={id}>
  <a href="/" class="active">Home</a>
  <a href="/pre-order">Pre Order</a>
  <a href={`/statement/${$student.id}`}>History</a>
  <a href="/account">Account</a>
  <a href="javascript:void(0);" class="icon" on:click={myFunction}>
    <i class="fa fa-bars"></i>
  </a>
  {#if $user.id}
     <!-- content here -->
     <!-- svelte-ignore a11y-click-events-have-key-events -->
     <p on:click={signOut} class="btn btn-danger btn-sm">
          <span class="glyphicon glyphicon-log-out"></span> Log out
      </p>
      <Modal show={$modal}>
        <Content />
      </Modal>
  {:else}
     <!-- else content here -->
     <a href="/login" class="btn btn-info btn-sm">
          <span class="glyphicon glyphicon-log-out"></span> Login
     </a>
  {/if}
  
</div>

	






<script>
	// import { student } from '$lib/store/user';
	import { student,user } from './store/user.js';
    import { onMount } from 'svelte';
    import Content from './Content.svelte';
    import Modal from './Modal.svelte';
    import { modal } from './store/modal.js';
    import { store } from './store/cart.js';
    import PocketBase from 'pocketbase';
    import { goto } from "$app/navigation";
    
    const url = 'https://bnet.fly.dev'

    const client = new PocketBase(url);

    const signOut = () => {
        client.authStore.clear();
        goto('/',{replaceState:true})
    }


    const fetchAndSetStudent = async(user) => {
      // console.log(user)
      const filter = `user_id = "${user.id}"`
      const resultList = await client.records.getList('students', 1, 2, {
          filter,
      });
      // console.log(resultList)
      return resultList.items[0]
    }
    onMount(async()=>{
      // await 
      let user_local = localStorage.getItem("pocketbase_auth")
      user_local = JSON.parse(user_local)
      if(user_local.model){
        // const id = user.model.id
        const stud = await fetchAndSetStudent(user_local.model)
        await fetchCart(stud)
        student.set(stud)
        user.set(user_local.model)
      }
    })


    const fetchCart = async (student) => {

        const filter = `created >= "2022-01-01 00:00:00" && committed = ${false} && student_id = "${student.id}"`
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

    let id="topnav"
    function myFunction() {
    // var x = document.getElementById("myTopnav");
    if (id === "topnav") {
        id += " responsive";
    } else {
        id = "topnav";
    }
    }
</script>





<style>


  .topnav {
    overflow: hidden;
    background-color: #333;
  }
  
  .topnav a {
    float: left;
    display: block;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
  }
  
  p{color: aliceblue;}
  
  .topnav a:hover {
    background-color: #ddd;
    color: black;
  }
  
  .topnav a.active {
    background-color: #04AA6D;
    color: white;
  }
  
  .topnav .icon {
    display: none;
  }
  
  @media screen and (max-width: 600px) {
    .topnav a:not(:first-child) {display: none;}
    .topnav a.icon {
      float: right;
      display: block;
    }
  }
  
  @media screen and (max-width: 600px) {
    .topnav.responsive {position: relative;}
    .topnav.responsive .icon {
      position: absolute;
      right: 0;
      top: 0;
    }
    .topnav.responsive a {
      float: none;
      display: block;
      text-align: left;
    }
  }
  </style>
  
  