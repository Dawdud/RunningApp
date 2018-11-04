<template>
  <div id="app">
    <div class="container">
     <div class="row">
       <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-12">
        <router-view></router-view>
       </div>
     </div>
      
    </div>
  </div>
</template>

<script>


export default {
  name: 'app',
 
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
  min-width: 100vw;
  
  
  
}


</style>
