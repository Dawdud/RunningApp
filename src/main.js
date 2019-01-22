import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import router from './routes';
import axios from 'axios';
import { store } from './store/store';
const fb= require('./firebaseConfig.js')

let app;




// export const eventBus= new Vue(

//   {

//     methods: {
//       getUser(){


//     },
//     OnSubmit(dataObject, typeObject){
//       axios.post('https://jogging-e3b56.firebaseio.com/user/'+ this.getUser() +`/${typeObject}.json`,dataObject)
//                .then(res => {this.$router.push('/')})
//                .catch(error => console.log(error))

//     },



//    },
//   }
// );




Vue.config.productionTip = false

Vue.use(VueRouter);


fb.auth.onAuthStateChanged(user =>{
  if(!app){
   app= new Vue({

      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
