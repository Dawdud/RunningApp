<template>
<div class="container">
    <div class="stats">
        <div class="stats__chart">
        <canvas id="myChart"></canvas>
        </div>
    </div>
</div>

</template>
<script>
import Chart from  'chart.js';
import axios from 'axios';
import {eventBus} from '../../main.js';
export default {

        data(){
            return {
                RunningChartData:{
                    type:"bar",
                    options:{
                        responsive: true,
                        lineTension:1,
                        title:{
                            display: true,
                            text: 'Running Distance in meters',
                            fontSize:20,
                        }
                    },


                },
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
                this.RunningChartData.data= {
                    labels: date,
                    datasets:[{
                        label:"distance",
                        data: distance,
                        backgroundColor: '#3C65F2',
                    }],

                };
                this.createChart('myChart', this.RunningChartData)





                })

            .catch(error=>console.log(error))

        }

    }

</script>
<style>

</style>