<template>
 <div class="container">
     <div class="row">
         
         <p>{{email}}</p>
     </div>
 </div>

</template>


<script>
    import firebase from 'firebase';
    export default {
       
        data(){
            return {
             userId:'',
              name:'',
              email:'',
            }
        },
         created() {
     var vm = this
     firebase.auth().onAuthStateChanged(function(user) {
       if (user) {
         vm.user = user;
         vm.name = vm.user.displayName;
         vm.email = vm.user.email;
         vm.userId = vm.user.uid;
      }
    });
  },
        methods: {
           
        }
    }
</script>