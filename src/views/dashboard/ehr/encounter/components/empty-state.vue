<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
      <div class="w-full p-2">
      <span
        class="
          flex flex-col
          w-full
          justify-center
          border-b-2
          font-bold
          mb-5
          text-xl text-primary
          py-2
        "
      >
        Vital SIgns
      </span>
    </div>
    <div class="w-8/12 mx-auto flex justify-center items-center flex-col">
        <empty-icon />
        <h3 class="text-center mt-5">There are no current vitals records for this patient</h3>
    <h3>Add new vitals by clicking the button below</h3>
        <div class="w-full flex items-center justify-center text-center">
            <button
        class="
            text-white
            font-semibold
            bg-danger
            rounded-full
            mt-5
            py-2
            px-4
            mx-3
            focus:outline-none
            hover:opacity-90
        "
        @click="$router.push('add-careteam')"
        >
        New Request
        </button>
        </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import EmptyIcon from "./empty-icon.vue"

@Options({
  components: {
      EmptyIcon,
  },
})
export default class EmptyState extends Vue {}
</script>
