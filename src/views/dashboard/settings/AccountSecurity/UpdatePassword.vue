<template>
  <div class="update-password">
  
    <section class='my-10 grid grid-cols-2 gap-4 '>
        <div>
      <label for="currentPassword"> Current Password </label>
      <br />
      <input
        type="password"
        id="currentPassword"
        placeholder="Enter Password"
        v-model="currentPassword"
      />
    </div>
    </section>
  
    <section class="  grid grid-cols-2 gap-4">
      <div>
        <label for="NewPassword"> New Password </label>
        <br />
        <input type="password" id="NewPassword" v-model="NewPassword" />
      </div>
      <div>
        <label for="ConfirmPassword"> Confirm Password </label>
        <br />
        <input
          type="password"
          id="ConfirmPassword"
          placeholder="Confirm New Password"
          v-model="ConfirmPassword"
        />
      </div>
    </section>

  <button class='update-password-button my-10 px-6 py-2 flex justify-end text-white'>
    Save
  </button>
  </div>
</template>

<script>

export default {
  name: "UpdatePassword",

 
};
</script>

<style scoped>
.update-password {
  border-top: 1px solid #b8c3de;
  border-bottom: 1px solid #b8c3de;
}

.update-password label {
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 19px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}
.update-password input {
  border: 1px solid #b8c3de;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 10px;
  width:100%;
}
.update-password-button{
  background: #EC0868;
  border-radius: 124px;
  border:none;
}

</style>
