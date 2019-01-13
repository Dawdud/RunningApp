<template>
  <div class="runningdetails">
    <div class="col-lg-6">
      <app-running-trials></app-running-trials>
    </div>

    <div class="details">
      <table class="details__table">
        <thead class="details__table__head">
          <tr>
            <th class="details__table__head__cell">Time</th>
            <th class="details__table__head__cell">Date</th>
            <th class="details__table__head__cell">Distance</th>
            <th class="details__table__head__cell">city</th>
          </tr>
        </thead>
        <tbody class="details__table__body">
          <tr v-for="(data) in trialData">
            <td class="details__table__body__cell">{{data.time}}</td>
            <td class="details__table__body__cell">{{data.date}}</td>
            <td class="details__table__body__cell">{{data.distance}}</td>
            <td class="details__table__body__cell">{{data.city}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import firebase from "firebase";
import { eventBus } from "../../main.js";
import RunningTrial from "../Trials/RunningTrials";

export default {
  data() {
    return {
         showForm: false,
         trialData: {},
         userUID: "",
              };
  },

  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userUID = user.uid;
      }
    });
  },

  watch: {
    userUID: "loadUserData"
  },

  methods: {
    loadUserData() {
      axios
      .get(
        `https://jogging-e3b56.firebaseio.com/user/${this.userUID}/trials.json`
      )
      .then(res => {

        const data = res.data;

        const users = [];
        for (let key in data) {
          const user = data[key];
          user.id = key;
          users.push(user);
        }
        this.trialData = users;
      })
      .catch(error => console.log(error));
    },



  },
   components: {
    "app-running-trials": RunningTrial
  }
};

</script>