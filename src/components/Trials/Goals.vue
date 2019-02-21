<template>
  <div class="goal">
    <div class="goal__info">
      <h2 class="goal__info--text">Goals</h2>
      <button class="btn__modal goal__info--btn" @click="openGoalModal()">add goal</button>
    </div>

    <transition name="modal__fade">
      <div v-if="showGoalModal" class="modal" @click="closeGoalModal()">
        <div class="modal__container" @click.stop>
          <form class="form" @submit.prevent>
            <div class="form__group--modal">
              <label for="goal-date" class="form__label--modal">Date:</label>
              <input type="month" id="goal-date" class="form__input--modal" v-model="goal.date">
            </div>
            <div class="form__group--modal">
              <label for="goal-distance" class="form__label--modal">Distance in km:</label>
              <input
                type="number"
                id="goal-distance"
                class="form__input--modal"
                v-model.number="goal.distance"
              >
            </div>
            <button class="btn__modal" @click="createGoals()">Submmit</button>
          </form>
        </div>
      </div>
    </transition>
     <div class="goal__details">
        <app-details ></app-details>
     </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import GoalsDetails from './GoalsDetails';
const fb = require('../../firebaseConfig.js')

export default {
  name: 'hello',
  data () {
    return {
      userId: '',
      showGoalModal: false,
      goal: {
        distance: '',
        date: ''
      }
    }
  },
  computed: {
    ...mapState(['userProfile', 'currentUser', 'goals'])
  },
  methods: {
    createGoals () {
      fb.goalsCollection
        .add({
          userId: this.currentUser.uid,
          distance: this.goal.distance,
          date: this.goal.date
        })
        .then(() => {
          this.closeGoalModal()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    openGoalModal () {
      this.showGoalModal = true
    },
    closeGoalModal () {
      this.showGoalModal = false
    }
  },
  components: {
    "app-details": GoalsDetails
  }
}
</script>
<style>
</style>
