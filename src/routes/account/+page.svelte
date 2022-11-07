<script>
    import { user,student } from "$lib/store/user";
    import PocketBase from 'pocketbase';
    import { goto } from "$app/navigation";

    const url = 'https://bnet.fly.dev'
    const client = new PocketBase(url);

    const signOut = () => {
        client.authStore.clear();
        goto('/',{replaceState:true})
    }

</script>


<!------ Include the above in your HEAD tag ---------->
<svelte:head>
    <!-- head content -->
    <link href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min.js"></script>
    <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
    
</svelte:head>



{#if $user.id}
     <!-- content here -->
     <!-- svelte-ignore a11y-click-events-have-key-events -->
     <p on:click={signOut} class="btn btn-info btn-lg">
         <span class="glyphicon glyphicon-log-out"></span> Log out
     </p>
{/if}
<br/>
<div class="container">
	<div class="row">
		<div class="col-sm-4 col-md-4 user-details">
            <div class="user-image">
                {#if $user.profile}
                     <!-- content here -->
                     <img src={`${url}/api/files/${$user.profile["@collectionId"]}/${$user.profile.id}/${$user.profile.avatar}?thumb=200x200`} alt={$user.email} title={$user.email} height="100" class="img-circle">
                     {:else}
                     <!-- else content here -->
                     <img src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Student_icon.svg" height="100" alt={$user.email} title={$user.email} class="img-circle">
                {/if}
            </div>
            <div class="user-info-block">
                <div class="user-heading">
                    <h3>{$user.email}</h3>
                    <span class="help-block">{$user.profile ? $user.profile.name : ""}</span>
                </div>
                <ul class="navigation">
                    <li class="active">
                        <a data-toggle="tab" href="#information">
                            <span class="glyphicon glyphicon-user"></span>
                        </a>
                    </li>
                    <li>
                        <a data-toggle="tab" href="#settings">
                            <span class="glyphicon glyphicon-cog"></span>
                        </a>
                    </li>
                    <li>
                        <a data-toggle="tab" href="#email">
                            <span class="glyphicon glyphicon-envelope"></span>
                        </a>
                    </li>
                    <li>
                        <a data-toggle="tab" href="#events">
                            <span class="glyphicon glyphicon-calendar"></span>
                        </a>
                    </li>
                </ul>
                <div class="user-body">
                    <div class="tab-content">
                        <div id="information" class="tab-pane active">
                            <h4>Account Information</h4>
                        </div>
                        <div id="settings" class="tab-pane">
                            <h4>Settings</h4>
                        </div>
                        <div id="email" class="tab-pane">
                            <h4>Send Message</h4>
                        </div>
                        <div id="events" class="tab-pane">
                            <h4>Events</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</div>

</div>




<style>
    body {background: #EAEAEA;}
.user-details {position: relative; padding: 0;}
.user-details .user-image {position: relative;  z-index: 1; width: 100%; text-align: center;}
 .user-image img { clear: both; margin: auto; position: relative;}

.user-details .user-info-block {width: 100%; position: absolute; top: 55px; background: rgb(255, 255, 255); z-index: 0; padding-top: 35px;}
 .user-info-block .user-heading {width: 100%; text-align: center; margin: 10px 0 0;}
 .user-info-block .navigation {float: left; width: 100%; margin: 0; padding: 0; list-style: none; border-bottom: 1px solid #428BCA; border-top: 1px solid #428BCA;}
  .navigation li {float: left; margin: 0; padding: 0;}
   .navigation li a {padding: 20px 30px; float: left;}
   .navigation li.active a {background: #428BCA; color: #fff;}
 .user-info-block .user-body {float: left; padding: 5%; width: 90%;}
  .user-body .tab-content > div {float: left; width: 100%;}
  .user-body .tab-content h4 {width: 100%; margin: 10px 0; color: #333;}
</style>