<template>
 <div class='update-password'>
     <div>
         <label for="currentPassword"> Current Password </label>
         <br>
            <input
                    type="password"
                    id="currentPassword"
                    placeholder="Enter Password"
                    v-model="currentPassword">
     </div>
      <section class='flex ' >
           <div>
         <label for="NewPassword"> New Password </label>
         <br>
            <input
                    
                    type="password"
                    id="NewPassword"
                    v-model="NewPassword">
     </div>
       <div>
         <label for="ConfirmPassword"> Confirm Password </label>
         <br>
            <input
                    type="password"
                    id="ConfirmPassword"
                    placeholder="Confirm New Password"
                    v-model="ConfirmPassword">
     </div>
      </section>
 </div>
</template>

<script>
export default {
  name: 'UpdatePassword',
 
 
}
</script>

<style scoped>
.update-password{
  border-top:1px solid #B8C3DE;
  margin:50px 0px;
}
.update-password div{
  margin:20px 0px
}
.update-password label{
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 19px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}
.update-password input{
    border: 1px solid #B8C3DE;
    box-sizing: border-box;
    border-radius: 4px;
   padding:10px;
}
.flex div{
  margin-right: 20px;
}


</style>
