<template>
  <div class="goal">
    <button class="goal___btn" @click="openGoalModal()">Goals</button>
    <transition name="fade">
    <div v-if="showGoalModal" class="modal">

      <div class="modal__container">
        <a @click="closeGoalModal">X</a>
        <p>Add your goal</p>
        <form @submit.prevent>
          <div class="form-group">
            <label for="goal-date">Date:</label>
            <input type="month" id="goal-date" class="form-control" v-model="goal.date">
            <label for="goal-distance">Distance in km:</label>
            <input
              type="number"
              id="goal-distance"
              class="form-control"
              v-model.number="goal.distance"
            >
          </div>
          <button class="btn btn-primary" @click="createGoals()">Submmit</button>
        </form>
      </div>
    </div>
    </transition>
    <div>
      <table class="table"></table>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex';
const fb= require('../../firebaseConfig.js')

export default {
  name: "hello",
  data() {
    return {
      showGoalModal: false,
      goal: {
        distance: "",
        date: ""
      }
    };
  },
  computed: {
      ...mapState(['userProfile','currentUser', 'hiddentrials'])
  },
  methods: {
   createGoals()
   {
     fb.goalsCollection.add({
        distance: this.goal.distance,
        date: this.goal.date,


      }).then(()=>{
        this.closeGoalModal()

      }).catch(err =>{
        console.log(err)
      })

   },
   openGoalModal()
   {
     this.showGoalModal= true;
   },
   closeGoalModal(){
     this.showGoalModal=false;
   }
  }
};
</script>
<style>
</style>
