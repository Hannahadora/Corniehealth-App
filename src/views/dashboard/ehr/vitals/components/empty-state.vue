<template>
  <div class="w-full flex flex-col justify-center items-center">
    <div class="w-full p-2">
      <span
        class="flex flex-col w-full justify-center border-b-2 font-bold mb-5 text-xl text-primary py-2"
      >
        Vital Signs
      </span>
    </div>
    <div class="w-8/12 mx-auto flex justify-center items-center flex-col mt-20 mb-12">
      <img src="@/assets/img/empty-vital-signs.svg" alt="">
      <h3 class="text-center mt-8 font-bold text-2xl ">
       Patient currently have no vitals on record
      </h3>
      <h3 class="mt-4 mb-8 text-base text-center" style="color: #667499">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum aenean mattis mi diam eget.</h3>
      <div class="w-full flex items-center justify-center text-center">
        <button
          class="text-white font-semibold bg-danger rounded-xl py-3 px-14 mx-3 focus:outline-none hover:opacity-90"
          @click="() => $emit('addnew')"
        >
          New Vitals
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import EmptyIcon from "./empty-icon.vue";

@Options({
  components: {
    EmptyIcon,
  },
})
export default class EmptyState extends Vue {}
</script>
