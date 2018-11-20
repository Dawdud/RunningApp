<template>
    <div>
    <p>Kalendarz</p>
    <div class="header row flex-middle">
        <div class="col col-start" >
            <div class="icon" @click="prevMonth()">
                chevron_left
            </div>
        </div>
    <div class="col col-center">
            <span>
            {{month}}   
            </span> 
    </div>
    <div class="col col-end" @click="nextMonth()">
        <div class="icon">
            chevron_right

        </div>

    </div>
    
    </div>
    <div class="days row"> 
        <div class="col col-center"v-for="item in weekDays">
          
            {{item}}

          

        </div>
  
  
      
    </div>
       
       <ul class="dates">
            <li v-for="blank in firstDayOfMonth">&nbsp;</li>
            <li v-for="date in daysInMonth" 
        		:class="{'current-day': date == initialDate && month == initialMonth && year == initialYear}">
            {{date}}
                <span></span>
            </li>
        </ul>
    </div>
   
</template>


<script>
import moment from 'moment';
export default {
        
        name: 'hello',
        
        data(){
            return {
                moment: moment(),
                today: moment(),
              
                weekDays: ['pn','wt','śr','cz','pt','so','nd'],
                

               
            }
        },
        methods: {
            nextMonth: function(){
             var t=this;
             t.moment= moment(t.moment).add(1,'month');

            },
            prevMonth: function(){
                var t= this;
                t.moment= moment(t.moment).subtract(1,'month');
                 
            },
            dateClick: function(){

            }
        },
        computed: {
          year: function()
          {
            var t= this;
            return t.moment.format('Y');
          },
          month: function(){
            var t= this;
            return t.moment.format('MMMM');
          },
          daysInMonth: function(){
            var t = this;
            return t.moment.daysInMonth();
          },
          currentDate: function(){
            var t= this;
            return t.moment.get('date')

          },
          firstDayOfMonth: function(){
            var t= this;
            var firstDay= moment(t.moment).subtract((t.currentDate-1),'days');
            return firstDay.weekday();
          },
          initialDate: function()
          {
            var t= this; 
            return t.today.get('date');
          },
          initialMonth: function(){
            var t= this; 
            return  t.today.format('MMMM');
          },
          initialYear: function()
          {
            var t= this; 
            return t.today.format('Y');
          }


        }

    }

    
</script>




 <style lang="scss">
  
@import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,700);
@import url(https://fonts.googleapis.com/icon?family=Material+Icons);

.icon {
  font-family: 'Material Icons', serif;
  font-style: normal;
  display: inline-block;
  vertical-align: middle;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: 'liga';
}
.dates{
   list-style-type: none;
    display: inline-block;
    width: 13.6%;
    text-align: center;
    margin-bottom: 5px;
    font-size:12px;
    color: #777;
}

/* VARIABLES */

:root {
  --main-color: #1a8fff;
  --text-color: #777;
  --text-color-light: #ccc;
  --border-color: #eee;
  --bg-color: #f9f9f9;
  --neutral-color: #fff;
}


/* GENERAL */



.dates{
    padding: 10px 0;
    background: #eee;
    width: 70vw;
    margin: 0;
    li{
      list-style-type: none;
    display: inline-block;
    width: 12.6%;
    text-align: center;
    margin-bottom: 45px;
    
    
    color: #777;

    }

}

</style>


















