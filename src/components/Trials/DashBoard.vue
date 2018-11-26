<template>
<div>
    <p>Dashboard</p>
</div>

</template>


<script>
import axios from 'axios';
import {eventBus} from '../../main.js';

export default {
       
        data(){
            return {
             
            
            }
        },
       

        created(){
            
            axios.get('https://jogging-e3b56.firebaseio.com/user/'+eventBus.getUser().uid+'/trials.json')
            .then(res=> {
                
               
                console.log(res)
                

                })

            .catch(error=>console.log(error))

        },
         methods: {
           
        },
      
    }


</script>

<style>



</style>