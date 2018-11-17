<template>
    
        
        <div class="container ">
           <div class="row">
            <header class="col-lg-12 d-flex align-items-center justify-content-around">
                <div class="brand">
                    
                </div>               
                <button v-on:click="logout">Logout</button>
                </header>
            
           </div>
            <div class="row ">
                <div class="col-lg-2 h-100 sidebar">
                    <nav>
                   <ul>
                       <router-link tag="li" to="/hello/trials"> Trials</router-link>
                       <router-link tag="li" to="/hello/details"> details</router-link>
                       <router-link tag="li" to="/hello/calendar"> calendar</router-link>
                      
                   </ul>
                    </nav>
                </div>
                <div class="col-lg-9 h-100 ">
                  <router-view></router-view>
                </div>

            </div>
        </div>
        

    
</template>

<script>
    import firebase from 'firebase';
    export default {
        name: 'hello',
        data(){
            return {
                msg: 'Welcomen to Your Vue.jS App'
            }
        },
        methods: {
            logout: function(){
                firebase.auth().signOut().then(()=>
                {this.$router.replace('login')})
            }
        }
    }
</script>

<style lang="scss" >
@import "src/scss/modules/colors.scss";
.container{
    margin: 0 auto;
    padding: 0;
    min-width:100vw;
   
    
}
header{
   
    background-color: white;
    border-bottom:  0.009em solid $border-color;
    min-height: 5vh !important;
    
}
.col-lg-2{
    background-color: $sidebar-color;
    color: white;
}

.h-100{
    min-height: 100vh;
}
</style>
