<template>
  <div class="w-full h-full p-4 flex">
    <div class="bg-primary w-4/12  h-full rounded-3xl flex  flex-col gap-8  justify-center items-center">
 <img src="@/assets/img/logo.svg"  class="absolute top-14 left-14"/>

  <img  :src="require(`@/assets/auth/signup.png`)" />
<div class="w-full flex items-center justify-center">
  <span class="text-white text-2xl font-bold  text-left w-8/12 mx-auto ">
    Connected, simple practice management software.
  </span>
</div>

    </div>

    <div class="flex flex-col justify-center items-center w-8/12">
  <slot/>
    </div>


  
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>