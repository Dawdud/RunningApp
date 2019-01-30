import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import router from './routes';
import { store } from './store/store';
const fb= require('./firebaseConfig.js')

let app;








Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(Vuelidate);

fb.auth.onAuthStateChanged(user =>{
  if(!app){
   app= new Vue({

      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
