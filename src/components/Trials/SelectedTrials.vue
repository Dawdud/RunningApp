<template>
 
     <div class="row">
         <div class="col-lg-10">
             <hr>
             <div class="table">
                 <table class="table">
  <thead class="thead-dark">
    <tr>
      
      <th scope="col">Time</th>
      <th scope="col">Date</th>
      <th scope="col">Distance</th>
      <th scope="col">city</th>
    </tr>
  </thead>
  <tbody>
     <tr>
      <th scope="row"></th>
        <td></td>
        
    </tr>
    
    
  </tbody>
</table>


             </div>
         </div>
     </div>
 

</template>
<script>
import axios from 'axios';
export default {
        
        data(){
            return {
             trialData:{},
            }
        },
        methods: {
           
        },
        created(){
            axios.get('https://jogging-e3b56.firebaseio.com/user/trials.json')
            .then(res=> {
                console.log(res)
                const data= res.data
                const users= []
                for(let key in data){
                   const user= data[key]
                   user.id = key
                   users.push(user)

                }
                console.log(users)
                
                

                })
            .catch(error=>console.log(error))

        }
    }
</script>