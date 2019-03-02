<template>
  <div id="app">
    <div class="app__container">

        <router-view></router-view>

     </div>

    </div>

</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app',

  computed: {
    ...mapState(['currentUser'])
  }

}
</script>

<style lang="scss">
@import './scss/main.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  $color: #2c3e50;

}
html,body, #app{
  height: 100vh;
   overflow-x: hidden;
    overflow-y: auto;

}

</style>
