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
                <div class="goal__progress">
                 
                </div>
              </div>
             
            </li>
           
          </ul>
          
          </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  
  computed: {
    ...mapState(["goals"])
  }
};
</script>

<style>
</style>
