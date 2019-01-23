<template>
  <div class="login">
    <header class="login__header"></header>
    <div class="login__content">

      <form action class="form">
        <h1>Sign In</h1>
        <input v-model="email" type="text" placeholder="Email" class="form__input">
        <input v-model="password" type="password" placeholder="Password" class="form__input">
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
  }
};
</script>
