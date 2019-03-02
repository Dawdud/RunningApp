<template>
  <div class="dashboard" v-if="goals.length">
    <div class="dashboard__stats">
      <div class="dashboard__stats__info">
        <h3>Ogólny cel</h3>
      </div>
      <ul v-for="(data) in  goals">
        <li>
          <h2>{{data.distance}}</h2>
        </li>
        <li>
          <h4>{{data.date}}</h4>
        </li>
        <li>
          <div class="goal__progressbar">
            <div class="goal__progress" :style="progresStyle"></div>
          </div>
        </li>
        <li></li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {}
  },
  data () {
    return {
      progresStyle: {},

      goal: 0
    }
  },
  computed: {
    ...mapState(['goals'])
  },
  created () {
    this.SumGoals()
  },
  methods: {
    SumGoals () {
      const goalSum = Math.ceil(
        (this.$store.getters.sumMonth * 100) / this.goals[0].distance
      )
      if (goalSum < 100) {
        this.progresStyle.width = `${goalSum}%`
      } else {
        this.progresStyle.width = `${99}%`
      }
    }
  }
}
</script>

<style>
</style>
