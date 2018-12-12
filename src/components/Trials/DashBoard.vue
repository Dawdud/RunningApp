<template>
<div class="dashboard">

            <div class="dashboard__stats">
                <div class="dashboard__stats__month">
                        <h3>W tym miesiącu przebiegłeś </h3>
                         <h2>{{monthSum}} metrów</h2>
                </div>
            </div>


            <div class="dashboard__stats">
                <div class="dashboard__stats__day">
                        <h3>Dzisiaj przebiegłeś</h3>
                        <h2>{{todaySum}}</h2>
                </div>
            </div>
            <div class="dashboard__stats">
                <div class="dashboard__stats__day">
                    <h3>Ogólny cel</h3>
                    <ul v-for="(data) in  Goalsdata">
                        <li><h2>{{data.distance}}</h2></li>
                        <li><h4>{{data.date}}</h4> </li>
                    </ul>
                </div>
            </div>
            </div>



</template>


<script>
import axios from 'axios';
import {eventBus} from '../../main.js';

export default {

        data(){
            return {
            monthSum:0,
             today: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
             Trialdata:{},
             todaySum:0,
             Goalsdata:{},

            }
        },


        created(){

            axios.get('https://jogging-e3b56.firebaseio.com/user/'+eventBus.getUser().uid+'/trials.json')
            .then(res=> {

                this.Trialdata= this.GetDataUser(res);
                this.monthSum= this.SumMonth();
                this.todaySum= this.getTodayTrial();

                return axios.get('https://jogging-e3b56.firebaseio.com/user/'+eventBus.getUser().uid+'/goals.json')
                })
                .then((res)=>{
                   this.Goalsdata= this.GetDataUser(res);
                   console.log(this.Goalsdata);

                })

            .catch(error=>console.log(error))


        },

         methods: {
             SumMonth()
             {
                let sum=0;

                for(let el in this.Trialdata)
                {
                   let date= new Date(this.Trialdata[el].date);
                   if(date.getMonth()+1==this.today.getMonth()+1){

                          sum +=this.Trialdata[el].distance;
                   }

                }
                return sum
             },

             getTodayTrial()
             {
                 let sum=0;
                 for(let element in this.Trialdata)
                 {
                     let date= new Date(this.Trialdata[element].date);
                     let trialDate= new Date(date.getFullYear(), date.getMonth(), date.getDate());
                    if(trialDate.getTime() === this.today.getTime() )
                    {

                        return this.Trialdata[element].distance;
                    }
                    else
                    {
                        return 0;
                    }



                 }
             },
             GetDataUser(res)
             {
                const responseData= res.data
                const users= []
                for(let key in responseData){
                   const user= responseData[key];

                   users.push(user);

                }
                return users;

             }

        },

    }


</script>

<style>



</style>