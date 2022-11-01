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
    import { store } from '$lib/store/cart.js'
    
    export let clickable;
    export let foody;
    let quantity = 0
    let total = 0

    const addCart = (food_obj) => {
        let cart = $store.orders;
        const obj = {
            name:food_obj.name,
            id:food_obj.id,
            price:food_obj.price,
            quantity:1,
        }
        const exist = cart.find(item=>item.id==food_obj.id)
        if (exist != null && exist != undefined) {
            exist.quantity += 1
            cart = cart.filter(item=>item.id != exist.id)
            cart = [...cart,exist]
            quantity = exist.quantity
        } else {
            cart = [...cart,obj]
            quantity = 1
        }

        
        store.set({
            ...$store,
            orders:cart
        })

        
        const getTotal = () => {
            let total = 0
            $store.orders.forEach((item)=>{
                total += (+item.price) * (+item.quantity)
            })
            return total
        }
        
        store.set({
            ...$store,
            total:getTotal()
        })


        console.log($store.orders)
    }
    



</script>

<div class="btn-group">
    <button>-</button>
    <button>{quantity}</button>
    <button on:click={()=>addCart(foody)}>+</button>
</div>
