<script>
    import { store } from "./store/cart";
    import { user } from "./store/user";
    let food_items = $store.orders

</script>


<!-- <div class="col-md-12">   
    <div class="row">
           
           <div class="receipt-main col-xs-10 col-sm-10 col-md-6 col-xs-offset-1 col-sm-offset-1 col-md-offset-3"> -->
               <div class="row">
                   <div class="receipt-header">
                       <div class="col-xs-6 col-sm-6 col-md-6">
                           <div class="receipt-left">
                               <img class="img-responsive" alt="iamgurdeeposahan" src="https://bootdey.com/img/Content/avatar/avatar6.png" style="width: 71px; border-radius: 43px;">
                           </div>
                       </div>
                       <div class="col-xs-10 col-md-10">
                           <div class="receipt-right">
                               <h5>{$user.email}</h5>
                               <p>{'S09-11866'}</p>
                               <p>{'company@gmail.com'}</p>
                           </div>
                           <h4>INVOICE # 1020</h4>
                       </div>
                       
                   </div>
               </div>
               
               
               
               <div>
                   <table class="table table-bordered">
                       <thead>
                           <tr class="text-primary">
                               <th>Description</th>
                               <th>Amount</th>
                           </tr>
                       </thead>
                       <tbody>
                        {#each food_items as item}
                             <!-- content here -->
                             <tr>
                                 <td class="col-md-9">{item.name}</td>
                                 <td class="col-md-3"> {item.price+'x'+item.quantity}</td>
                             </tr>
                        {:else}
                             no items in the cart
                        {/each}
                           <!-- <tr>
                               <td class="text-right">
                               <p>
                                   <strong>Total Amount: </strong>
                               </p>
                               <p>
                                   <strong>Late Fees: </strong>
                               </p>
                               <p>
                                   <strong>Payable Amount: </strong>
                               </p>
                               <p>
                                   <strong>Balance Due: </strong>
                               </p>
                               </td>
                               <td>
                               <p>
                                   <strong><i class="fa fa-inr"></i> 65,500/-</strong>
                               </p>
                               <p>
                                   <strong><i class="fa fa-inr"></i> 500/-</strong>
                               </p>
                               <p>
                                   <strong><i class="fa fa-inr"></i> 1300/-</strong>
                               </p>
                               <p>
                                   <strong><i class="fa fa-inr"></i> 9500/-</strong>
                               </p>
                               </td>
                           </tr> -->
                           <tr>
                              
                               <td class="text-right"><h2><strong>Total: </strong></h2></td>
                               <td class="text-left text-danger">
                                <h2> 
                                    <strong>{$store.total}/-</strong>
                                </h2>
                               </td>
                           </tr>
                       </tbody>
                   </table>
               </div>
               
               <div class="row">
                   <div class="receipt-header receipt-header-mid receipt-footer">
                       <div class="col-xs-8 col-sm-8 col-md-8 text-left">
                           <div class="receipt-right">
                               <p><b>Date :</b> 15 Aug 2016</p>
                               <h5 style="color: rgb(140, 140, 140);">Thanks for pre ordering.</h5>
                           </div>
                       </div>
                       <div class="col-xs-4 col-sm-4 col-md-4">
                           <div class="receipt-left">
                               <h1>Stamp</h1>
                           </div>
                       </div>
                   </div>
               </div>
               
           <!-- </div>    
       </div>
   </div> -->




<style>
    
        .text-danger strong {
        	color: #9f181c;
		}
		.receipt-footer h1 {
			font-size: 15px;
			font-weight: 400 !important;
			margin: 0 !important;
		}
		.receipt-main thead th {
			color:#fff;
		}
		.receipt-right h5 {
			font-size: 16px;
			font-weight: bold;
			margin: 0 0 7px 0;
		}
		.receipt-right p {
			font-size: 12px;
			margin: 0px;
		}
		.receipt-right p i {
			text-align: center;
			width: 18px;
		}
		.receipt-main td p:last-child {
			margin: 0;
			padding: 0;
		}	
		.receipt-main td h2 {
			font-size: 20px;
			font-weight: 900;
			margin: 0;
			text-transform: uppercase;
		}
		.receipt-header-mid .receipt-left h1 {
			font-weight: 100;
			margin: 34px 0 0;
			text-align: right;
			text-transform: uppercase;
		}
		.receipt-header-mid {
			margin: 24px 0;
			overflow: hidden;
		}
		
</style>