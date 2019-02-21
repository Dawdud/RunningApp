<template>
  <div class="content">
    <aside class="aside">
      <nav class="aside__nav" role="custom-dropdown">
        <h1 class="logo--nav">
          Running
          <span class="logo__highlight">App</span>
        </h1>

        <span class="navbar-toggle" @click="toggleMenu= !toggleMenu">
          <i class="fas fa-bars"></i>
        </span>

        <ul class="aside__nav__main" :class="{toggle:toggleMenu}">
          <router-link tag="li" to="/hello/dashboard">
            <span style="font-size: 1.1em; padding:.8rem">
              <i class="fas fa-tachometer-alt"></i>
            </span> Dashboard
          </router-link>
          <router-link tag="li" to="/hello/details">
            <span style="font-size: 1.1em; padding:.8rem">
              <i class="fas fa-running"></i>
            </span> Track details
          </router-link>
          <router-link tag="li" to="/hello/goals">
            <span style="font-size: 1.1em; padding:.8rem">
              <i class="fas fa-trophy"></i>
            </span> goals
          </router-link>
          <router-link tag="li" to="/hello/stats">
            <span style="font-size: 1.1em; padding:.8rem">
              <i class="fas fa-chart-bar"></i>
            </span>stats
          </router-link>
          <li>
            <a @click="logout()">
              <span style="font-size: 1.1em; padding:.8rem">
                <i class="fas fa-sign-out-alt"></i>
              </span> logout
            </a>
          </li>
        </ul>
      </nav>
    </aside>
    <main class="main">
      <div class="main__content">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'hello',
  data () {
    return {
      toggleMenu: false
    }
  },
  methods: {
    logout () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push('login')
        })
    }
  }

}
</script>

<style lang="scss" >
</style>
