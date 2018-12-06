<template>
 <div class="row">
            <header class="col-lg-12 d-flex align-items-center justify-content-around">
                <div class="brand">

                </div>
                <button v-on:click="logout">Logout</button>


                </header>

           </div>
</template>
<script>

import firebase from 'firebase';
export default {

        data(){
            return {


            }
        },



         methods: {
              logout: function(){
                firebase.auth().signOut().then(()=>
                {this.$router.replace('login')})
            }

        },

    }

</script>
<style>

</style>
