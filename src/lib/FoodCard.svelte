<script>
    import { Card, Button, Toggle } from "flowbite-svelte";
    import { Alert } from 'flowbite-svelte';
    import { InformationCircle } from "svelte-heros";
    let hCard = false;
    export let item
    export let url
    let src=`${url}/api/files/${item["@collectionId"]}/${item.id}/${item.image}?thumb=200x200`
</script>
  <div>
    <Card img={src} href="/" horizontal reverse={hCard}>
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name} &nbsp; @{item.price}/=</h5>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
            {#if item.other_names}
                 {#each item.other_names as names}
                     {names} &nbsp;
                 {/each}
            {:else}
                 not provided
            {/if}
      </p>
      {#if item.available}
          <Alert color="green">
              <span slot="icon">
                <!-- <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg> -->
                <InformationCircle/>
            </span>
              <span class="font-medium">Available!</span> This Food type is available today.
          </Alert>
      {:else}
          <Alert color="red">
              <span slot="icon"><svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
              </span>
              <span class="font-medium">Not Available!</span> This Food type is not available today.
          </Alert>
      {/if}
    </Card>
    <!-- <Toggle bind:checked={hCard} class="mt-4 italic dark:text-gray-500">Reverse</Toggle> -->
  </div>