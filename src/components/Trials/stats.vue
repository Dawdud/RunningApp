<template>
<div class="container">
    <div class="row">
        <div class="col">
        <canvas id="myChart"></canvas>
        </div>
    </div>
</div>

</template>
<script>
import Chart from  'chart.js';

import {eventBus} from '../../main.js';
export default {

        data(){
            return {
                RunningChartData:{},
            }
        },
        methods: {
            createChart(chartId, chartData)
            {
                const ctx= document.getElementById(chartId);
                const myChart= new Chart(ctx, {
                    type: chartData.type,
                    data: chartData.data,
                    options: chartData.options,
                });
            }
        },
        mounted()
        {
            this.createChart('myChart', this.RunningChartData)
        },
        created()
        {
             axios.get('https://jogging-e3b56.firebaseio.com/user/'+eventBus.getUser().uid+'/trials.json')
            .then(res=> {

                const data= res.data
                const distance= [];
                const date=[];
                for(let key in data){
                   const distanceTrial= data[key].distance;
                   const  dateTrial= data[key].date;

                   distance.push(distanceTrial);
                   date.push(dateTrial);

                }
                this.RunningChartData.distance= distance;
                this.RunningChartData.date= date;




                })

            .catch(error=>console.log(error))

        }

    }

</script>
<style>

</style>