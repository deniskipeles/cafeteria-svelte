<script>
    import { order } from "$lib/store/order";
    import { onDestroy } from "svelte";


    export let data
    let statement = []
    if(data.history.items){
        statement = data.history.items.map(item=>{
            const time = new Date(item.date)
            const ret = {
                ...item,
                created:formatAMPM(time),
                today:getDate(time)
            }
            return ret
        })
    }
    // console.log(data)


    function getDate(date) {
        const today = new Date(date);
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedToday = dd + '/' + mm + '/' + yyyy;
        return formattedToday
    }
    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    
</script>


<svelte:head>
    <!-- <link rel="stylesheet" href=""> -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
</svelte:head>

<div class="container">
                      
                                
    <div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-body text-center">
                <h5 class="card-title m-b-0">Static Table With Checkboxes</h5>
            </div>
                <div class="table-responsive">
                    <table class="table">
                        <thead class="thead-light">
                            <tr>
                                <th>
                                    <label class="customcheckbox m-b-20">
                                        <input type="checkbox" id="mainCheckbox">
                                        <span class="checkmark"></span>
                                    </label>
                                </th>
                                <th scope="col">Meal</th>
                                <th scope="col">Food List</th>
                                <th scope="col">Time</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody class="customtable">
                            {#each statement as item}
                                 <!-- content here -->
                                 <tr>
                                     <th>
                                         <label class="customcheckbox">
                                             <input type="checkbox" checked={item.commit} class="listCheckbox">
                                             <span class="checkmark"></span>
                                         </label>
                                     </th>
                                     <td>
                                        <p>{item.meal}</p>
                                        <p>serial no:{item.s_number}</p>
                                        <p>Reg number:{item.reg_number}</p>
                                     </td>
                                     <td>
                                        {#if item.order.length > 0}
                                             <!-- content here -->
                                             {#each item.order as order}
                                                 <!-- content here -->
                                                 <p>{order.name}: {order.price}x{order.quantity}</p>
                                             {/each}
                                        {/if}
                                     </td>
                                     <td>
                                        <p>{item.today}</p>
                                        <p>{item.created}</p>
                                        
                                     </td>
                                     <td>{item.total}/=</td>
                                 </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
        </div>
    </div>
</div>

   </div> 




<style>
     @import url(http://fonts.googleapis.com/css?family=Calibri:400,300,700);

body {
    background-color: #673AB7;
    font-family: 'Calibri', sans-serif !important
}

.container{
   margin-top:100px;
}
.card {
      position: relative;
   display: -webkit-box;
   display: -ms-flexbox;
   display: flex;
   -webkit-box-orient: vertical;
   -webkit-box-direction: normal;
   -ms-flex-direction: column;
   flex-direction: column;
   min-width: 0;
   word-wrap: break-word;
   background-color: #fff;
   background-clip: border-box;
   border: 0px solid transparent;
   border-radius: 0px;
}


.card-body {
   -webkit-box-flex: 1;
   -ms-flex: 1 1 auto;
   flex: 1 1 auto;
   padding: 1.25rem;
}

.card .card-title {
   position: relative;
   font-weight: 600;
   margin-bottom: 10px;
}


.table {
   width: 100%;
   max-width: 100%;
   margin-bottom: 1rem;
   background-color: transparent;
}

* {
   outline: none;
}

.table th, .table thead th {
   font-weight: 500;
}


.table thead th {
   vertical-align: bottom;
   border-bottom: 2px solid #dee2e6;
}


.table th {
   padding: 1rem;
   vertical-align: top;
   border-top: 1px solid #dee2e6;
}


.table th, .table thead th {
   font-weight: 500;
}


th {
   text-align: inherit;
}


.m-b-20 {
   margin-bottom: 20px;
}


.customcheckbox {
   display: block;
   position: relative;
   padding-left: 24px;
   font-weight: 100;
   margin-bottom: 12px;
   cursor: pointer;
   font-size: 22px;
   -webkit-user-select: none;
   -moz-user-select: none;
   -ms-user-select: none;
   user-select: none;
}


.customcheckbox input {
   position: absolute;
   opacity: 0;
   cursor: pointer;
}

.checkmark {
   position: absolute;
   top: -3px;
   left: 0;
   height: 20px;
   width: 20px;
   background-color: #CDCDCD;
   border-radius: 6px;
}


.customcheckbox input:checked ~ .checkmark {
   background-color: #2196BB;
}


.customcheckbox .checkmark:after {
   left: 8px;
   top: 4px;
   width: 5px;
   height: 10px;
   border: solid white;
   border-width: 0 3px 3px 0;
   -webkit-transform: rotate(45deg);
   -ms-transform: rotate(45deg);
   transform: rotate(45deg);
}
</style>