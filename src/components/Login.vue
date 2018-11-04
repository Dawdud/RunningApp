<template>
    <div class="login">
        <h2>Sign In </h2>
        <input v-model="email" type="text" placeholder="Email">
        <input v-model="password" type="password" placeholder="Password">
        <button @click="signIn">Connection </button>
        <p><router-link to="/sign-up">You don't have an account? You can create one</router-link></p>
    </div>
</template>
<script>
    import firebase from 'firebase'
    export default{
        name: 'login',
        data: function(){
            return {
                email:'',
                password:''
            }
        },
        methods:{
            signIn: function(){
               firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                   (user) =>{
                       this.$router.replace('hello')
                   },
                   (err) =>{
                       alert('Ooops'+err.message)
                   }
               )
            }
        }
    }
</script>
