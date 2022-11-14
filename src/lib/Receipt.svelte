<script>
    import { store } from "./store/cart";
    import { user } from "./store/user";
    let food_items = $store.orders
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
</script>
  
  <Table color="green" hoverable={true}>
    <TableHead>
      <TableHeadCell>Product name</TableHeadCell>
      <TableHeadCell>Quantity</TableHeadCell>
      <TableHeadCell>Price</TableHeadCell>
      <TableHeadCell>Sub Total</TableHeadCell>
    </TableHead>
    <TableBody class="divide-y">
        {#each food_items as item}
                <TableBodyRow>
                  <TableBodyCell>{item.name}</TableBodyCell>
                  <TableBodyCell>{item.quantity}</TableBodyCell>
                  <TableBodyCell>{item.price}</TableBodyCell>
                  <TableBodyCell>{item.price*item.quantity}</TableBodyCell>
                </TableBodyRow>
        {:else}
                no items in the cart
        {/each}
    </TableBody>
  </Table>