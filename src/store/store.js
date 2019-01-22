import Vue from 'vue';
import Vuex from 'vuex';
const fb= require('../firebaseConfig.js');

Vue.use(Vuex);

// handle page reload
fb.auth.onAuthStateChanged(user => {
  if (user) {
      store.commit('setCurrentUser', user)
      store.dispatch('fetchUserProfile')

      fb.usersCollection.doc(user.uid).onSnapshot(doc => {
          store.commit('setUserProfile', doc.data())
      })


      fb.trialsCollection.orderBy('date', 'desc').onSnapshot(QuerySnapshot => {

          let createdByCurrentUser
          if (QuerySnapshot.docs.length) {

              if(store.state.currentUser.uid == QuerySnapshot.docChanges()[0].doc.data().userId)
              {
                createdByCurrentUser=true
              }
              else{
               createdByCurrentUser=false
              }
          }


          if (QuerySnapshot.docChanges().length !== QuerySnapshot.docs.length
              && QuerySnapshot.docChanges()[0].type == 'added' && !createdByCurrentUser) {

              let trial = QuerySnapshot.docChanges[0].doc.data()
              trial.id = QuerySnapshot.docChanges[0].doc.id

              store.commit('setHiddenTrials', trial)
          } else {


              let trialsArray = []

              QuerySnapshot.forEach(doc => {
                if(store.state.currentUser.uid==doc.data().userId){
                  let post = doc.data()
                  post.id = doc.id
                  trialsArray.push(post)
                }
              })

              store.commit('setTrials', trialsArray)
          }
      })
  }
})

export const store = new Vuex.Store({
  state: {
      currentUser: null,
      userProfile: {},
      trials: [],
      hiddenTrials: []
  },
  actions: {
     clearData({ commit }) {
          commit('setCurrentUser', null)
          commit('setUserProfile', {})
          commit('setPosts', null)
          commit('sethiddenTrials', null)
      },
      fetchUserProfile({ commit, state }) {
          fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
              commit('setUserProfile', res.data())
          }).catch(err => {
              console.log(err)
          })
      },

  },
  mutations: {
      setCurrentUser(state, val) {
          state.currentUser = val
      },
      setUserProfile(state, val) {
          state.userProfile = val
      },
      setTrials(state, val) {
          if (val) {
              state.trials = val
          } else {
              state.trials = []
          }
      },
      setHiddenTrials(state, val) {
          if (val) {
              // make sure not to add duplicates
              if (!state.hiddenTrials.some(x => x.id === val.id)) {
                  state.hiddenTrials.unshift(val)
              }
          } else {
              state.hiddenTrials = []
          }
      }
  }
})