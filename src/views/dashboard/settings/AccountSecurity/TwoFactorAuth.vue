<template>
    <div class="two-factor">
        <div class=" flex mt-10 mb-6">
               Disabled
              <ToogleCheck class='mx-4'></ToogleCheck>
               Enabled
        </div>
       <div class='flex '>
           <list-boxes types='checkbox' value='Enforce two factor authentication during sign in for all users within your domain.'>
           </list-boxes>
       <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 7H9V5H11V7ZM11 15H9V9H11V15ZM10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0Z" fill="#0A4269"/>
        </svg>
        </div>
    <div class='two-factor-form grid grid-cols-3 gap-x-16 my-10 '>
        <div class='col-span-2 mt-10 '>
      <label for="otp"> Enter the one time password sent to you email </label>
      <br />
      <input
        type="text"
        id="otp"
        placeholder="Enter OTP"
        v-model="otp"
      />
      <br />
      <p class='text-pink-600 font-bold'> SEND CODE </p>
    </div>

       <div class='grid-cols-3 my-10'>
      <label for="Password"> Corfirm Password </label>
      <br />
      <input
        type="password"
        id="Password"
        placeholder=" Password"
        v-model="Password"
      />
    </div>
    </div>

  <button class='two-factor-button  my-10 px-6 py-2 flex justify-end text-white'>
    Save
  </button>

    </div>
</template>

<script>
import ListBoxes from "@/components/ListBoxes.vue";
import ToogleCheck from "@/components/ToogleCheck.vue";

export default {
  name: "TwoFactorAuth",
 components: {
    ListBoxes,
    ToogleCheck
  }
 
};
</script>

<style scoped>
.two-factor{
     border-top: 1px solid #b8c3de;
     border-bottom: 1px solid #b8c3de;
}
.two-factor-form{
    border-top: 3px dashed #b8c3de;
     border-bottom: 3px dashed #b8c3de;
}
.two-factor-form input {
  border: 1px solid #b8c3de;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 10px;
  width:100%;
}

.two-factor-button{
  background: #EC0868;
  border-radius: 124px;
  border:none;
}






</style>
