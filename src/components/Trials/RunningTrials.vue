<template>
 <div class="container">
     <button class="btn " @click="showForm = !showForm">Add new Trial</button>
     <div class="row">
          
         <div class=" col-lg-10 d-flex justify-content-center align-self-center"  >
            
         <form  v-show="showForm">
             <div class="form-group ">
         <label for="trial-time">Time:</label>
         <input type="time" id="trial-time"  class="form-control" v-model="trial.time" step="2" />
         <label for="trial-date">Date:</label>
         <input type="date" id="trial-date" class="form-control" v-model="trial.date"/>
         <label for="trial-distance">Distance in meters: </label>
         <input type="number" id="trial-distance"  class="form-control" v-model.number="trial.distance"/>
         <label for="trial-city">City</label>
         <input type="text" id="trial-city" class="form-control" v-model="trial.city">


         </div>
         <button  @click="trialsSubmit" class="btn btn-primary"> Add trial</button>
        </form> 
         </div>        
        
     </div>
     
 </div>

</template>


<script>
    import axios from 'axios';
    
    import firebase from 'firebase';
    import {eventBus} from '../../main.js'
    
    export default {
        name: 'hello',
        data(){
            
            return {
                showForm: false,
                userId:'',
                trial: {
                    distance:'',
                    date: new Date().toISOString().slice(0,10),
                    time:'',
                    city:'', 
                    

                }
                         
            }
        },
          
      
        methods: {
            
           trialsSubmit(){
               const trialDetails={
                   distance: this.trial.distance,
                   date: this.trial.date,
                   time: this.trial.time,
                   city: this.trial.city,
                   userId: this.userId
            };
               
               eventBus.OnSubmit(trialDetails, 'trials')
               
           },
       
        },
           
        
        components: {
            
        }
    }
</script>