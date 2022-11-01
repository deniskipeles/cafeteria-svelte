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




<script>
    import {order_store} from "$lib/store/cart";
    order_store.set({
        food_items:[],
        total:0,
        balance:0,
    })
    console.log(order_store)

    export let clickable;
</script>

<div class="btn-group">
    <button>-</button>
    <button>{0}</button>
    <button>+</button>
</div>
