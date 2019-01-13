<template>
    <div class="sign-up">
        <h2>Let's create a new account!</h2>
        <input type="text" v-model="signupForm.email" placeholder="Email">
        <input type="password" v-model="signupForm.password" placeholder="Password">
        <button v-on:click="signUp">Sing Up</button>
        <span><router-link to="/login">or go back to login</router-link></span>
    </div>
</template>
<script>
import firebase from 'firebase'
const fb = require('../../firebaseConfig.js')
export default{
    name:'signUp',
    data: function(){
        return {
            signupForm: {
            email:'',
            password:''
            }
        }
    },
    methods: {
        signUp: function(){
            fb.auth.createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password).then(user => {
        this.$store.commit('setCurrentUser', user)

        // create user obj
        fb.usersCollection.doc(user.uid).set({
            email: this.email,

        }).then(() => {
            this.$store.dispatch('fetchUserProfile')
            this.$router.push('/dashboard')
        }).catch(err => {
            console.log(err)
        })
    }).catch(err => {
        console.log(err)
    })
        }
    }
}
</script>