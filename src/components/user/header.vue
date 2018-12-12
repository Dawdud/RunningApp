<template>
 <div class="row">


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
