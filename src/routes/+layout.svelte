

<script>
  import "../app.css"
  import Navbar from "$lib/NavBar.svelte";
    import Footer from "$lib/Footer.svelte";
</script>
<Navbar/>
<div class="wrapper">
  <slot></slot>

</div>
<Footer/>


<style>
  .wrapper {
    display: grid;
    /* grid-template-columns: 1fr; */
    /* grid-template-rows: 100vh; */
    align-items: center;
    justify-items: center;
  }
</style>