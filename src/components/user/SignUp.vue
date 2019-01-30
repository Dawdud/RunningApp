<template>
  <div class="login">
    <app-header></app-header>
    <div class="login__content">
      <form action class="form" @submit.prevent>
        <h1>Let's create a new account!</h1>
         <div  class="form__group--signup"  >
             
        <input 
        :class="{invalid__input: $v.signupForm.email.$error}"
        class="form__input--signup" 
        type="text" 
        @blur="$v.signupForm.email.$touch()"
        v-model="signupForm.email" 
        placeholder="Email">
         <p v-if="!$v.signupForm.email.email ">Please provide a valid email adress.</p>
          <p v-if="!$v.signupForm.email.required && clickSumbit">This field is required.</p>
         </div>
         <div  class="form__group--signup">
             
        <input class="form__input--signup" 
        type="password" 
         @blur="$v.signupForm.password.$touch()"
        v-model="signupForm.password" 
        placeholder="Password">
         <p v-if="!$v.signupForm.password.required && clickSumbit">This field is required.</p>
       
         </div>
        
        <button @click="signUp" :disabled="$v.signupForm.$error" class="btn__form">Sing Up</button>
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
import {required, email} from 'vuelidate/lib/validators';
const fb = require("../../firebaseConfig.js");
export default {
  name: "signUp",
  data() {
    return {
      clickSumbit: false,
      signupForm: {
        email: "",
        password: ""
      }
    };
  },
  validations: {
      signupForm:{    
      email:{
      required,
      email
    },
    password: {
      required
    }
    }
  },
  methods: {
    signUp() {
      this.clickSumbit=true;
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