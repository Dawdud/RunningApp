<template>
  <div class="stats">
    <div class="goal__info">
      <h2 class="goal__info--text">Statistics</h2>
    </div>
    <div class="stats__chart">
      <canvas id="myChart"></canvas>
    </div>
  </div>
</template>
<script>
import Chart from 'chart.js'

import { mapState } from 'vuex'

import { runingChartData } from '../../runningChart.js'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapState(['userProfile', 'trials'])
  },
  methods: {
    createChart (chartId, chartData) {
      const ctx = document.getElementById(chartId)
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      })
    },
    getStatsData () {
      const distance = []
      const date = []
      for (const key in this.trials) {
        const distanceTrial = this.trials[key].distance
        const dateTrial = this.trials[key].date

        distance.push(distanceTrial)
        date.push(dateTrial)
      }

      return [distance, date]
    }
  },
  mounted () {
    this.createChart(
      'myChart',
      runingChartData(this.getStatsData()[1], this.getStatsData()[0])
    )
  }
}
</script>
<style>
</style>
