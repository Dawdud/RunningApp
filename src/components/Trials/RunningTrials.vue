<template>
  <div class="trials">
     <button class="trials___btn" @click="openTrialModal()">Trial</button>
    <transition name="fade">
      <div v-if="showTrialModal" class="modal">
        <div class="modal__container">
           <a @click="closeTrialModal()">X</a>
        <form >
          <div class="form-group">
            <label for="trial-time">Time:</label>
            <input type="time" id="trial-time" class="form-control" v-model="trial.time" step="2">
            <label for="trial-date">Date:</label>
            <input type="date" id="trial-date" class="form-control" v-model="trial.date">
            <label for="trial-distance">Distance in meters:</label>
            <input
              type="number"
              id="trial-distance"
              class="form-control"
              v-model.number="trial.distance"
            >
            <label for="trial-city">City</label>
            <input type="text" id="trial-city" class="form-control" v-model="trial.city">
          </div>
          <button @click="createTrials" class="btn btn-primary">Add trial</button>
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