

<svelte:head>
    <!-- head content -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</svelte:head>



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





<div class={id}>
  <a href="/" class="active">Home</a>
  <a href="/pre-order">Pre Order</a>
  <a href="/contact">Mess Contact</a>
  <a href="/about">About</a>
  <a href="javascript:void(0);" class="icon" on:click={myFunction}>
    <i class="fa fa-bars"></i>
  </a>
  <Modal show={$modal}>
    <Content />
  </Modal>
  
</div>

	






<script>
     import { store } from '$lib/store/cart.js'
     import Content from './Content.svelte';
      import Modal from './Modal.svelte';
      import { modal } from './store/modal.js';

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

