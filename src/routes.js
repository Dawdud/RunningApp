
import Login from './components/Login.vue';
import signUp from './components/SignUp.vue';
import Hello from './components/user/Hello.vue';
import RuningTrials from './components/Trials/RunningTrials.vue';
import Details from './components/user/Details.vue';
import Router from 'vue-router';
import firebase from 'firebase';
import Vue from 'vue';

Vue.use(Router)

 let router=  new Router({ 
    routes:  [  
{ 
    path:'/', 
    redirect: '/login'},
{ 
    path:'*', 
    redirect: '/login'},

{ path:'/login', 
component: Login}, 
{
path:'/sign-up', 
component:signUp },
{
path: '/hello', 
component:Hello,
children:[
    {path: 'trials', 
    component: RuningTrials, 
    
},
    {
    path: 'details', 
    component: Details 
 }

],
meta: {
    requiresAuth: true
}
}]
});
router.beforeEach((to, from, next)=>{
    let currentUser= firebase.auth().currentUser;
    let requiresAuth= to.matched.some(record => record.meta.requiresAuth);
    if(requiresAuth && !currentUser) next('login')
    else if(!requiresAuth && currentUser) next('hello')
    else next()


})
export default router