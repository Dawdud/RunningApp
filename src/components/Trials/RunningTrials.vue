<template>
  <div class="trials">
     <div class="goal__info">
         <h2 class="goal__info--text">Trials</h2>     
     <button class="btn__modal goal__info--btn" @click="openTrialModal()"> add Trial</button>
     </div>
       <transition name="modal__fade">
      <div v-if="showTrialModal" class="modal" @click="closeTrialModal()" >
         
        <div class="modal__container" @click.stop>
          
           
          
           
          
        <form class="form">
          <div class="form__group--modal">
            <label for="trial-time" class="form__label--modal">Time:</label>
            <input type="time" id="trial-time" class="form__input--modal" v-model="trial.time" step="2">
          </div>
          <div class="form__group--modal">
            <label for="trial-date" class="form__label--modal">Date:</label>
            <input type="date" id="trial-date" class="form__input--modal" v-model="trial.date">
          </div>
          <div class="form__group--modal">
            <label for="trial-distance" class="form__label--modal">Distance in meters:</label>
            <input
              type="number"
              id="trial-distance"
              class="form__input--modal"
              v-model.number="trial.distance"
            >
          </div>
          <div class="form__group--modal">
            <label for="trial-city" class="form__label--modal">City</label>
            <input type="text" id="trial-city" class="form__input--modal" v-model="trial.city">
          </div>
          <button @click="createTrials" class="btn__modal">Add trial</button>
        </form>
          
      </div>
         
        
       
      </div>
       </transition>
    
  </div>
  
</template>


<script>
import {mapState} from 'vuex';
const fb= require('../../firebaseConfig.js')

export default {
  name: "hello",
  data() {
    return {
      showTrialModal: false,
      userId: "",
      trial: {
        distance: "",
        date: new Date().toISOString().slice(0, 10),
        time: "",
        city: ""
      }
    };
  },
  computed: {
      ...mapState(['userProfile','currentUser'])
  },
  methods: {

    createTrials()
    {
      fb.trialsCollection.add({
        distance: this.trial.distance,
        date: this.trial.date,
        time: this.trial.time,
        city: this.trial.city,
        userId: this.currentUser.uid,

      }).then(ref=>{
        this.trial.distance= ''

      }).catch(err =>{
        console.log(err)
      })
    },
    openTrialModal(){
      this.showTrialModal=true;
    },
    closeTrialModal()
    {
      this.showTrialModal= false;
    }

  },

  components: {}
};
</script>