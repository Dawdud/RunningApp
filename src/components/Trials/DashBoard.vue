<template>
<div>
    <div class="row">
        <div class="col-lg-4">
            <p>W tym miesiącu przebiegłeś </p>
            <p>{{monthSum}} metrów</p>
            <button @click="getTodayTrial()">get week</button>

        </div>
        <div class="col-lg-4">
            <p>Dzisiaj przebiegłeś</p>
            <p>{{todaySum}}</p>

        </div>
        <div class="col-lg-4">
            <p>Ogólny cel</p>
            <ul v-for="(data) in  Goalsdata">
                <li>{{data.distance}}</li>
                <li>{{data.date}} </li>
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