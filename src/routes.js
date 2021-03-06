import Router from 'vue-router'
import firebase from 'firebase'
import Vue from 'vue'
import Login from './components/user/Login.vue'
import signUp from './components/user/SignUp.vue'
import Hello from './components/user/Hello.vue'
import Goals from './components/Trials/Goals.vue'
import Stats from './components/Trials/stats.vue'
import Details from './components/Trials/TrialsDetails.vue'
import DashBoard from './components/Trials/DashBoard.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '*',
      redirect: '/login'
    },

    { path: '/login', component: Login },
    {
      path: '/sign-up',
      component: signUp
    },
    {
      path: '/hello',
      component: Hello,
      children: [
        { path: 'dashboard', component: DashBoard },
        {
          path: 'details',
          component: Details
        },
        {
          path: 'goals',
          component: Goals
        },
        {
          path: 'stats',
          component: Stats
        }
      ],
      meta: {
        requiresAuth: true
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  const { currentUser } = firebase.auth()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('hello')
  else next()
})
export default router
