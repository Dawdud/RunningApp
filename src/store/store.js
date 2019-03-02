import Vue from 'vue'
import Vuex from 'vuex'

const fb = require('../firebaseConfig.js')

Vue.use(Vuex)

// handle page reload
fb.auth.onAuthStateChanged((user) => {
  if (user) {
    store.commit('setCurrentUser', user)
    store.dispatch('fetchUserProfile')

    fb.usersCollection.doc(user.uid).onSnapshot((doc) => {
      store.commit('setUserProfile', doc.data())
    })

    const onSnapshot = (store, settings) => (QuerySnapshot) => {
      let createdByCurrentUser

      if (QuerySnapshot.docs.length) {
        if (
          store.state.currentUser.uid ===
          QuerySnapshot.docChanges()[0].doc.data().userId
        ) {
          createdByCurrentUser = true
        } else {
          createdByCurrentUser = false
        }
      }

      if (
        QuerySnapshot.docChanges().length !== QuerySnapshot.docs.length &&
        QuerySnapshot.docChanges()[0].type === 'added' &&
        !createdByCurrentUser
      ) {
        const trial = QuerySnapshot.docChanges[0].doc.data()
        trial.id = QuerySnapshot.docChanges[0].doc.id
      } else {
        const trialsArray = []

        QuerySnapshot.forEach((doc) => {
          if (store.state.currentUser.uid === doc.data().userId) {
            const trial = doc.data()
            trial.id = doc.id
            trialsArray.push(trial)
          }
        })

        store.commit(settings, trialsArray)
      }
    }
    fb.trialsCollection
      .orderBy('date', 'desc')
      .onSnapshot(onSnapshot(store, 'setTrials'))
    fb.goalsCollection
      .orderBy('date', 'desc')
      .onSnapshot(onSnapshot(store, 'setGoals'))
  }
})

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    trials: [],
    goals: [],
    today: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    )
  },
  getters: {
    sumMonth: (state) => {
      let sum = 0

      for (const el in state.trials) {
        const date = new Date(state.trials[el].date)
        if (date.getMonth() + 1 === state.today.getMonth() + 1) {
          sum += state.trials[el].distance
        }
      }
      return sum
    }
  },
  actions: {
    clearData ({ commit }) {
      commit('setCurrentUser', null)
      commit('setUserProfile', {})
    },
    fetchUserProfile ({ commit, state }) {
      fb.usersCollection
        .doc(state.currentUser.uid)
        .get()
        .then((res) => {
          commit('setUserProfile', res.data())
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mutations: {
    setCurrentUser (state, val) {
      state.currentUser = val
    },
    setUserProfile (state, val) {
      state.userProfile = val
    },
    setTrials (state, val) {
      if (val) {
        state.trials = val
      } else {
        state.trials = []
      }
    },
    setGoals (state, val) {
      if (val) {
        state.goals = val
      } else {
        state.goals = []
      }
    }
  }
})
