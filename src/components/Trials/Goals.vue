<template>
<div class="row">
    <div>

           <button class="btn btn-primary" @click="showForm = !showForm">Add your goal!!</button>
           <div class="form-group" v-show="showForm">
            <form>
             <div class="form-group">
             <label for="goal-date">Date:</label>
             <input type="month" id="goal-date" class="form-control"  v-model="goal.date"/>
             <label for="goal-distance">Distance in km: </label>
             <input type="number" id="goal-distance"  class="form-control" v-model.number="goal.distance"/>
             </div>
             <button class="btn btn-primary" @click="goalsSubmit">Submmit</button>
            </form>

           </div>

    </div>
    <div>
        <table class="table">



        </table>
    </div>
</div>

</template>
<script>


    import {eventBus} from '../../main.js'

    export default {
        name: 'hello',
        data(){

            return {
                showForm: false,
                goal: {
                    distance:'',
                    date:'',



                }

            }
        },
        methods: {
            goalsSubmit(){
               const goalDetails={
                   distance: this.goal.distance,
                   date: this.goal.date,
            };

               eventBus.OnSubmit(goalDetails, 'goals')
        }
        }



    }
</script>
<style>



</style>
