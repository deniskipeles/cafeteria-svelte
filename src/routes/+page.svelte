<script>
    import FoodCard from './../lib/FoodCard.svelte';
    export let data;
    let    food_items = []
    if(data.food_items){
        food_items = data.food_items.items
    }
</script>



<!-- <svelte:head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
    
</svelte:head> -->


<s-head>
    <title>Machakos University Cafeteria Online Meal Ticket Booking</title>
</s-head>







{#each food_items as item}
    <!-- content here -->
    <!-- <div class="container root">
    <div class="card" style="width:400px">
    <div class="row">
    <div class="col-sm-6">
    <img class="card-img" src={`${data.url}/api/files/${item["@collectionId"]}/${item.id}/${item.image}?thumb=200x200`} alt="Card image"/>
    </div>
    <div class="col-sm-6">
    <div class="card-body-right">
        <h4 class="card-title">{item.name}</h4>
        <p class="card-text">
            {#if item.other_names}
                 {#each item.other_names as names}
                     {names} &nbsp;
                 {/each}
            {:else}
                 not provided
            {/if}
        </p>
        <h3 class="card-text text-success">{item.price}/=</h3>
        {#if item.available}
             <p class="btn btn-primary">available</p>
        {:else}
             <p class="btn btn-danger">not available</p>
        {/if}
    </div>
    </div>
    </div> 
    </div>
    </div> -->
    <FoodCard {item} url={data.url}/>
    <br/>
{/each}

<!-- 
<style>
    .root {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}
</style> -->

