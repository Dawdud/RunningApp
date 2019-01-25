<template>
  <div class="login">
    <app-header></app-header>
    <div class="login__content">

      <form action class="form">
        <h1>Sign In</h1>
        <div class="form__group">
        <input v-model="email" type="text"  class="form__input">
        <span class="bar"></span>
         <label  class="form__label">Email</label>
        </div>
        <div class="form__group">
        <input v-model="password" type="password"  class="form__input">
        <span class="bar"></span>
        <label class="form__label">Password</label>
        </div>
        <button @click="signIn" class="btn__form">Sign-in</button>

      </form>

    </div>
    <footer class="login__footer">
      <p>
        <router-link to="/sign-up">You don't have an account? You can create one</router-link>
      </p>
    </footer>

    <transition name="fade">
      <div v-if="errorMsg !==''" class="error-msg">
        <p>{errorMsg}</p>
      </div>
    </transition>
  </div>
</template>
<script>
import firebase from "firebase";
import header from  "./header";
export default {
  name: "login",
  data: function() {
    return {
      errorMsg: "",
      email: "",
      password: ""
    };
  },
  methods: {
    signIn: function() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            this.$store.commit("setCurrentUser", user);
            //this.$store.dispatch('fetchUserProfile')
            this.$router.replace("hello");
          },
          err => {
            alert("Ooops" + err.message);
            this.errorMsg = err.message;
          }
        );
    }
  },
   components: {
    "app-header": header
  }
};
</script>
