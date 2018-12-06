<template>


        <div class="container ">

            <div class="row ">
                <div class="col-lg-2 h-100 sidebar">
                    <nav>
                   <ul>
                        <router-link tag="li" to="/hello/dashboard"> Dashboard</router-link>
                       <router-link tag="li" to="/hello/details"> Track details</router-link>
                       <router-link tag="li" to="/hello/goals"> goals</router-link>
                      <router-link tag="li" to="/hello/stats"> stats</router-link>


                   </ul>
                    </nav>
                </div>
                <div class="col-lg-9 h-100 ">
                    <app-header></app-header>
                  <router-view></router-view>
                </div>

            </div>
        </div>



</template>

<script>

    import header from './header.vue';
    export default {
        name: 'hello',
        data(){
            return {

            }
        },
        methods: {

        },
        components: {
            'app-header': header,
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
