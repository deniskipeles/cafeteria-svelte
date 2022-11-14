<script>
	import Cart from './Cart.svelte';
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button, Input } from 'flowbite-svelte'
  import { student,user } from './store/user.js';
  import { onMount, afterUpdate } from 'svelte';
  import { store } from './store/cart.js';
  import PocketBase from 'pocketbase';
  import { goto } from "$app/navigation";
  
  const url = 'https://bnet.fly.dev'

  const client = new PocketBase(url);

  const signOut = () => {
      client.authStore.clear();
      student.set({})
      user.set({})
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
    if(user_local){
      if(user_local.model){
        // const id = user.model.id
        const stud = await fetchAndSetStudent(user_local.model)
        await fetchCart(stud)
        student.set(stud)
        user.set(user_local.model)
      }

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
</script>

<Navbar let:hidden let:toggle>
  <NavBrand href="/">
    <img
      src="/favicon.png"
      class="mr-3 h-6 sm:h-9"
      alt="Flowbite Logo"
    />
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
      mksu cafeteria
    </span>
  </NavBrand>
  <div class="flex md:order-2">
    {#if $user.id}
    <Cart/>
    {:else}
      <Button on:click={()=>{
        goto("/login",{replaceState:true})
      }} size="sm">Login</Button>
    {/if}
    <NavHamburger on:click={toggle} />
  </div>
  <NavUl {hidden} class="order-1">
    <NavLi href="/" active={true}>Home</NavLi>
    <NavLi href="/add-to-cart">Meal Booking</NavLi>
    <NavLi href={`/statement/${$student.id}`}>History</NavLi>
    <NavLi href="/account">Account</NavLi>
    <!-- <NavLi href="/contact">Contact</NavLi> -->
  </NavUl>
</Navbar>