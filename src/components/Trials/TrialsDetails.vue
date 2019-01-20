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
          <tr v-for="(data) in trials" >
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

import { mapState } from 'vuex';
import RunningTrial from "../Trials/RunningTrials";

export default {
  data() {
    return {

              };
  },



   computed: {
    ...mapState(['userProfile', 'trials', 'currentUser'])
  },


  methods: {




  },
   components: {
    "app-running-trials": RunningTrial
  }
};

</script>