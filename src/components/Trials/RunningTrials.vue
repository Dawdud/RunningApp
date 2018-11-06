<template>
 <div class="container">
     <div class="row">
         <div class=" col-lg-10 d-flex justify-content-center align-self-center">
         <form>
             <div class="form-group ">
         <label for="trial-time">Time:</label>
         <input type="time" id="trial-time"  class="form-control" v-model="trial.time" step="2" />
         <label for="trial-date">Date:</label>
         <input type="date" id="trial-date" class="form-control" v-model="trial.date"/>
         <label for="trial-distance">Distance in km: </label>
         <input type="number" id="trial-distance"  class="form-control" v-model.number="trial.distance"/>
         <label for="trial-city">City</label>
         <input type="text" id="trial-city" class="form-control" v-model="trial.city">


         </div>
         <button  @click="onSubmit" class="btn btn-primary"> Add trial</button>
        </form> 
         </div>        
        
     </div>
     <div class="row">
         <div class="col-lg-12">
              <app-selected></app-selected>
         </div>
     </div>
 </div>

</template>


<script>
    import axios from 'axios';
    import Selected from './SelectedTrials.vue';
    export default {
        name: 'hello',
        data(){
            
            return {
                
                trial: {
                    distance:'',
                    date: new Date().toISOString().slice(0,10),
                    time:'',
                    city:''

                }
                         
            }
        },
      
        methods: {
            
           onSubmit (){
               const trialDetails={
                   distance: this.trial.distance,
                   date: this.trial.date,
                   time: this.trial.time,
                   city: this.trial.city,
            };
               axios.post('https://jogging-e3b56.firebaseio.com/user/trials.json',trialDetails)
               .then(res => console.log(res))
               .catch(error => console.log(error))
               
           }
          
        },
        components: {
            'appSelected': Selected
        }
    }
</script>