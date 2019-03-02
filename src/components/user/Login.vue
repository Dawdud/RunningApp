<template>
  <div class="login">
    <app-header></app-header>

    <div class="login__content">
      <form action class="form" @submit.prevent>
        <h1>Sign In</h1>
        <transition name="form__fade">
          <div v-if="errorMsg !==''" class="form__error">
            <p>
              <span style="font-size: 1.1em; padding:.1rem">
                <i class="fas fa-exclamation-circle"></i>
              </span>
              {{errorMsg}}
            </p>
          </div>
        </transition>
        <div class="form__group">
          <input v-model="email" type="text" class="form__input" required>
          <span class="bar"></span>
          <label class="form__label">Email</label>
        </div>
        <div class="form__group">
          <input v-model="password" type="password" class="form__input" required>
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
  </div>
</template>
<script>
import firebase from 'firebase'
import header from './header.vue'

export default {
  name: 'login',
  data () {
    return {
      errorMsg: '',
      email: '',
      password: ''
    }
  },
  methods: {
    signIn () {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            this.$store.commit('setCurrentUser', user)
            // this.$store.dispatch('fetchUserProfile')
            this.$router.replace('hello')
          },
          (err) => {
            this.errorMsg = err.message
          }
        )
    }
  },
  components: {
    'app-header': header
  }
}
</script>
