<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
    <div class="w-full p-2">
      <span
        class="flex flex-col w-full justify-center border-b-2 font-bold mb-5 text-xl text-primary py-2"
      >
        Care Team
      </span>
    </div>
    <div class="w-8/12 mx-auto flex justify-center items-center flex-col">
      <empty-icon />
      <h3 class="text-center mt-5">Patient doesn’t belong to any care team.</h3>
      <h3>
        Adding patient to a care team enables [Benefit of adding patient to a
        care team]
      </h3>
      <div class="w-full flex items-center justify-center text-center">
        <button
          class="text-primary rounded-full mt-5 py-2 px-3 mx-3 focus:outline-none hover:opacity-90"
          style="border: 1px solid #080056"
          @click="$router.push('add-careteam')"
        >
          Create New
        </button>
        <button
          class="bg-danger rounded-full text-white mt-5 py-2 px-3 mx-3 focus:outline-none hover:opacity-90"
          @click="$router.push('add-careteam')"
        >
          Add to Existing
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import EmptyIcon from "./icons/empty-icon.vue";

@Options({
  components: {
    EmptyIcon,
  },
})
export default class DomainEmptyState extends Vue {}
</script>
