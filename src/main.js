import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import router from './routes'; 
import firebase from 'firebase';
let app;
let config = {
  apiKey: "AIzaSyADoJhTDAdYoSU3GoUanBkx1GD4B0UQeds",
  authDomain: "jogging-e3b56.firebaseapp.com",
  databaseURL: "https://jogging-e3b56.firebaseio.com",
  projectId: "jogging-e3b56",
  storageBucket: "jogging-e3b56.appspot.com",
  messagingSenderId: "664250265620"
};





firebase.initializeApp(config);


Vue.config.productionTip = false

Vue.use(VueRouter);

firebase.auth().onAuthStateChanged(function(user){

  if(!app){
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})
