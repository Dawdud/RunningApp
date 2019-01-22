<template>
  <div class="container">
    <div class="stats">
      <div class="stats__chart">
        <canvas id="myChart"></canvas>
      </div>
    </div>
  </div>
</template>
<script>
import Chart from "chart.js";
import { mapState } from 'vuex';
import firebase from 'firebase';
export default {
  data() {
    return {

      RunningChartData: {
        type: "bar",
        options: {
          responsive: true,
          lineTension: 1,
          title: {
            display: true,
            text: "Running Distance in meters",
            fontSize: 20
          }
        }
      },


    };
  },
  computed: {
      ...mapState(['userProfile', 'trials']),
  },
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    },
    getStatsData()
    {
      const distance= [];
      const date= [];
      for(let key in this.trials){
        const distanceTrial= this.trials[key].distance;
        const dateTrial= this.trials[key].date;

        distance.push(distanceTrial);
        date.push(dateTrial);
      }


      return [distance, date];
    },
   setChartData(){
       this.RunningChartData.data = {
          labels: '2010-09-18', //his.getStatsData()[0],
          datasets: [
            {
              label: "distance",
              data: 4500, //this.getStatsData()[0],
              backgroundColor: "#3C65F2"
            }
          ]
        };
        
        this.createChart("myChart", this.RunningChartData);

    }
  },
  mounted() {},
  created() {

    this.getStatsData();
    this.setChartData();


    /*axios
      .get(
        "https://jogging-e3b56.firebaseio.com/user/" +
          this.userUID +
          "/trials.json"
      )
      .then(res => {
       / const data = res.data;
        const distance = [];
        const date = [];
        for (let key in data) {
          const distanceTrial = data[key].distance;
          const dateTrial = data[key].date;

          distance.push(distanceTrial);
          date.push(dateTrial);
        }
        this.RunningChartData.data = {
          labels: date,
          datasets: [
            {
              label: "distance",
              data: distance,
              backgroundColor: "#3C65F2"
            }
          ]
        };
        this.createChart("myChart", this.RunningChartData);
      })

      .catch(error => console.log(error));
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userUID = user.uid;
      }
    });*/


  }

};
</script>
<style>
</style>