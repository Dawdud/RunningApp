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
import axios from "axios";
import firebase from "firebase";
import { mapState } from 'vuex';



export default {
  data() {
    return {
             monthSum:0,
             today: new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDate()
            ),
             todaySum: 0,
             Goalsdata: {},

              };
  },

  created() {
    /*firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userUID = user.uid;
      }
    });*/
  },
  computed: {
    ...mapState(['userProfile'])
  },

  watch: {
    userUID: "loadUserData"
  },

  methods: {
    loadUserData() {
      axios
        .get(
          `https://jogging-e3b56.firebaseio.com/user/${$store.state.currentUser.uid}/trials.json`
        )
        .then(res => {
          console.log(res);
          this.Trialdata = this.GetDataUser(res);
          this.monthSum = this.SumMonth();
          this.todaySum = this.getTodayTrial();

          return axios.get(
            `https://jogging-e3b56.firebaseio.com/user/${this.userUID}/goals.json`
          );
        })
        .then(res => {

          this.Goalsdata = this.GetDataUser(res);

        })
        .catch(error => console.log(error));
    },
    GetDataUser(res) {
      const responseData = res.data;
      const users = [];
      for (let key in responseData) {
        const user = responseData[key];

        users.push(user);
      }
      return users;
    },
     SumMonth() {
      let sum = 0;

      for (let el in this.Trialdata) {
        let date = new Date(this.Trialdata[el].date);
        if (date.getMonth() + 1 == this.today.getMonth() + 1) {
          sum += this.Trialdata[el].distance;
        }
      }
      return sum;
    },
    getTodayTrial() {
      let sum = 0;
      for (let element in this.Trialdata) {
        let date = new Date(this.Trialdata[element].date);
        let trialDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        );
        if (trialDate.getTime() === this.today.getTime()) {
          return this.Trialdata[element].distance;
        } else {
          return 0;
        }
      }
    },

  }
};

</script>

<style>
</style>