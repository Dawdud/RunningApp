<template>
  <div class="login">
    <app-header></app-header>
    <div class="login__content">
      <form action class="form" @submit.prevent>
        <h1>Let's create a new account!</h1>
         <div  class="form__group--signup">
             
        <input class="form__input--signup" type="text" v-model="signupForm.email" placeholder="Email">
         </div>
         <div  class="form__group--signup">
             
        <input class="form__input--signup" type="password" v-model="signupForm.password" placeholder="Password">
         </div>
        
        <button @click="signUp" class="btn__form">Sing Up</button>
      </form>
    </div>
    
      <footer class="login__footer">
      <p>
         <router-link to="/login">or go back to login</router-link>
        
      </p>
     
    </footer>
    </div>
  
</template>
<script>
import firebase from "firebase";
import header from "./header";
const fb = require("../../firebaseConfig.js");
export default {
  name: "signUp",
  data() {
    return {
      signupForm: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    signUp() {
      this.performingRequest = true;

      fb.auth
        .createUserWithEmailAndPassword(
          this.signupForm.email,
          this.signupForm.password
        )
        .then(user => {
          this.$store.commit("setCurrentUser", user);

          // create user obj
          fb.usersCollection
            .doc(user.uid)
            .set({
              email: this.email
            })
            .then(() => {
              this.$store.dispatch("fetchUserProfile");
              this.$router.push("/dashboard");
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  components: {
    "app-header": header
  }
};
</script>