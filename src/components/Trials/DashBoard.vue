<template>
<div>
    <div class="row">
        <div class="col-lg-4">
            <p>W tym miesiącu przebiegłeś </p>
            <p>{{monthSum}} metrów</p>
          
        </div>
        <div class="col-lg-4">
            <p>tydzień</p>
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
             Trialdata:{},
             Goalsdata:{},
            
            }
        },
       

        created(){
            
            axios.get('https://jogging-e3b56.firebaseio.com/user/'+eventBus.getUser().uid+'/trials.json')
            .then(res=> {

                this.Trialdata= this.GetDataUser(res);
                this.monthSum= this.SumData();
                return axios.get('https://jogging-e3b56.firebaseio.com/user/'+eventBus.getUser().uid+'/goals.json')
                })
                .then((res)=>{
                   this.Goalsdata= this.GetDataUser(res);
                   console.log(this.Goalsdata);

                })

            .catch(error=>console.log(error))
            this.SumData();

        },
       
         methods: {
             SumData()
             {
                let sum=0;
                let today= new Date();
                for(let el in this.Trialdata)
                {
                   let d= new Date(this.Trialdata[el].date);     
                   if(d.getMonth()+1==today.getMonth()+1){

                          sum +=this.Trialdata[el].distance;
                   }
                   
                }
                return sum
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