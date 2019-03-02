<template>
  <div class="dashboard">
    <div class="dashboard__stats">
      <div class="dashboard__stats__month">
        <div class="dashboard__stats__info">
          <h3>W tym miesiącu przebiegłeś</h3>
        </div>
        <div class="dashboard__stats__content">
          <h2>{{monthSum}} metrów</h2>
        </div>
      </div>
    </div>

    <div class="dashboard__stats">
      <div class="dashboard__stats__day">
        <div class="dashboard__stats__info">
          <h3>Dzisiaj przebiegłeś</h3>
        </div>
        <div class="dashboard__stats__content">
          <h2>{{todaySum}}</h2>
        </div>
      </div>
    </div>

    <goal-details :monthSum="monthSum"></goal-details>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import store from '../../store/store.js'
import GoalsDetails from './GoalsDetails.vue'

export default {

  data () {
    return {
      monthSum: 0,
      todaySum: 0,

      today: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      ),

      Goalsdata: {}
    }
  },

  computed: {
    ...mapState(['userProfile', 'trials'])
  },

  created () {
    this.getTodayTrial()
    this.SumMonth()
  },

  methods: {
    GetDataUser (res) {
      const responseData = this.trials
      const users = []
      for (const key in responseData) {
        const user = responseData[key]

        users.push(user)
      }
      return users
    },

    SumMonth () {
      this.monthSum = this.$store.getters.sumMonth
    },
    getTodayTrial () {
      for (const element in this.trials) {
        const date = new Date(this.trials[element].date)

        const trialDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        )
        if (trialDate.getTime() === this.today.getTime()) {
          this.todaySum = this.trials[element].distance
        }
      }
    }
  },
  components: {
    'goal-details': GoalsDetails
  }
}
</script>

<style>
</style>
