<script>
    import Receipt from "./Receipt.svelte";
    import { getContext } from 'svelte';
    export let onCancel = () => {};
    export let onOkay = () => {};
  
    const { close } = getContext('simple-modal');
      
      let value;
      let onChange = () => {};
      
      function _onCancel() {
          onCancel();
          close();
      }
      
      function _onOkay() {
          onOkay(value);
          close();
      }
      
      $: onChange(value)
  </script>
  




  <style>
      
      .buttons {
          display: flex;
          justify-content: space-between;
      }
      
  </style>




  <!-- <h2>{message}</h2> -->
  <Receipt/>
  
  <div class="buttons">
      <button on:click={_onCancel}>
          Cancel
      </button>
      <button on:click={_onOkay}>
          Okay
      </button>
  </div>