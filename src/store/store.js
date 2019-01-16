import Vue from 'vue';
import Vuex from 'vuex';
const fb= require('../firebaseConfig.js');

Vue.use(Vuex);

// handle page reload
fb.auth.onAuthStateChanged(user => {
  if (user) {
      store.commit('setCurrentUser', user)
      store.dispatch('fetchUserProfile')

      fb.trialsCollection.orderBy('distance', 'desc').onSnapshot(QuerySnapshot=>{
        let trialArray= []
        QuerySnapshot.forEach(doc =>{
          let trial= doc.data()
          trial.id=doc.id
          trialArray.push(trial)
        })
        store.commit('setTrials', trialArray)
      })

      fb.usersCollection.doc(user.uid).onSnapshot(doc => {
          store.commit('setUserProfile', doc.data())
      })


  }
})


export const store= new Vuex.Store({
    state: {
        currentUser: null,
        userProfile: {},
        trials: []
    },
    getters: {
      getUser: state=>{
        return state.user;
      }
    },
    actions:{
      clearData({commit}){
        commit('setCurrentUser', null)
        commit('setUserProfile', {})
        commit('setTrials', null)
      },
     fetchUserProfile({commit,state}){
       fb.usersCollection.doc(state.currentUser.uid).get()
       .then(res=>{
         commit('setUserProfile', res.data())
       }).catch(err=>{
         console.log(err)
       })

     }
    },
    mutations:{
      setCurrentUser(state, val){
        state.currentUser= val
      },
      setUserProfile(state, val){
        state.userProfile= val
      },
      setTrials(state, val){
        if(val){
          state.trials= val
        }
        else{
          state.trials=[]
        }
      }
    }
});