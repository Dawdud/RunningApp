<template>


     <div class="row">
        <div class="col-lg-6">
            <app-running-trials></app-running-trials>
        </div>
        
         <div class="col-lg-10">
              

             
             <div class="table">
                 <table class="table">
  <thead class="thead-dark">
    <tr>
      
      <th scope="col">Time</th>
      <th scope="col">Date</th>
      <th scope="col">Distance</th>
      <th scope="col">city</th>
      
    </tr>
  </thead>
  <tbody>
     <tr>
      <th scope="row"></th>
      <tr v-for="(data) in trialData">
        <td >{{data.time}}</td>
        <td> {{data.date}}</td>
        <td> {{data.distance}}</td>
        <td> {{data.city}}</td>
        
    </tr>
    
    
  </tbody>
</table>



             </div>
         </div>
     </div>
 

</template>
<script>
import axios from 'axios';
import {eventBus} from '../../main.js';
import RunningTrial from '../Trials/RunningTrials';
export default {
       
        data(){
            return {
             showForm:false,
             trialData:{},
            
            }
        },
       

        created(){
            
            axios.get('https://jogging-e3b56.firebaseio.com/user/'+eventBus.getUser().uid+'/trials.json')
            .then(res=> {
                
                const data= res.data
                const users= []
                for(let key in data){
                   const user= data[key]
                   user.id = key
                   users.push(user)

                }
                this.trialData= users;
               
                
                

                })

            .catch(error=>console.log(error))

        },
         methods: {
           
        },
        components:
        {
            'app-running-trials': RunningTrial,
        }
    }
</script>