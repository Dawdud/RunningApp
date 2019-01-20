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
    <div class="dashboard__stats">
      <div class="dashboard__stats__day">
        <div class="dashboard__stats__info">
          <h3>Ogólny cel</h3>
        </div>
        <div class="dashboard__stats__content">
          <ul v-for="(data) in  Goalsdata">
            <li>
              <h2>{{data.distance}}</h2>
            </li>
            <li>
              <h4>{{data.date}}</h4>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import { mapState } from 'vuex';



export default {
  data() {

    return {
             monthSum:0,
             todaySum:0,

             today: new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDate()
            ),

             Goalsdata: {},

              };
  },


  computed: {
    ...mapState(['userProfile', 'trials']),


  },

   created() {
     this.getTodayTrial();
     this.SumMonth();
   },

  methods: {

    GetDataUser(res) {
      const responseData = this.trials;
      const users = [];
      for (let key in responseData) {
        const user = responseData[key];

        users.push(user);
      }
      return users;
    },

     SumMonth() {
      let sum = 0;

      for (let el in this.trials) {
        let date = new Date(this.trials[el].date);
        if (date.getMonth() + 1 == this.today.getMonth() + 1) {
          sum += this.trials[el].distance;
        }
      }
      this.monthSum= sum;
    },
    getTodayTrial() {
      let sum = 0;
      for (let element in this.trials) {
        let date = new Date(this.trials[element].date);

        let trialDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        );
        if (trialDate.getTime() === this.today.getTime()) {
            this.todaySum=  this.trials[element].distance;
            console.log("new sum");

        }
      }

    },

  }
};

</script>

<style>
</style>