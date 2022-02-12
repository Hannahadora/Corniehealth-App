<template>
  <div
    class="flex justify-center  mb-32 p-3 mt-2 rounded w-full"
  >
    <div class="w-full">
      <span
        class="flex flex-col w-full justify-center border-b-2 font-bold mb-10 text-lg text-primary py-2"
      >
        Practitioner Profile
      </span>
      <span class="w-full h-screen bg-white mb-32 shadow-md">

        
        
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import ChevronRightIcon from "@/components/icons/chevronrightorange.vue";
import ChevronLeftIcon from "@/components/icons/chevronleftorange.vue";

@Options({
  name: "Practioner Profile",
  components: {

    ChevronRightIcon,
    ChevronLeftIcon,

  },
})
export default class PractitonerProfile extends Vue {

}
</script>

<style>
</style>
