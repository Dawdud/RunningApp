<template>
  <div class="row">
  <button @click="logout">logout</button>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  data() {
    return {};
  },

  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("login");
        });
    }
  }
};
</script>
<style>
</style>
