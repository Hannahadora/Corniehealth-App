<template>
  <div class="w-1/2 flex flex-col justify-center items-center">
    <img src="@/assets/img/nocurrency.svg" />
    <h3 class="text-center text-black mt-5">No collection account recorded </h3>
    <h4 class="text-black text-center">Add new account</h4>
    <button
      class="
        bg-danger
        rounded-full
        text-white
        mt-5
        py-2
        px-3
        focus:outline-none
        hover:opacity-90
      "
           @click="$emit('newExchangeRate')"
    >
       <span class='mt-2 mr-2'> <bank-add-icon/>  </span> 
      New  Exchange Rate
    </button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class emptyState extends Vue {
  
}
</script>
