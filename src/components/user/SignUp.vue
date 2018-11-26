<template>
    <div class="sign-up">
        <p>Let's create a new account!</p>
        <input type="text" v-model="email" placeholder="Email">
        <input type="password" v-model="password" placeholder="Password">
        <button v-on:click="signUp">Sing Up</button>
        <span><router-link to="/login">or go back to login</router-link></span>
    </div>
</template>
<script>
import firebase from 'firebase' 

export default{
    name:'signUp',
    data: function(){
        return {
            email:'',
            password:''
        }
    },
    methods: {
        signUp: function(){
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                (user)=>{
                    this.$router.replace('login')
                },
                function(err){
                    alert('oops'+err.message)
                }
            )
        }
    }
}
</script>