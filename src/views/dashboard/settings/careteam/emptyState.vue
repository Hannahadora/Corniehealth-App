<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
    <img src="@/assets/img/empty-careteam.svg" />
    <div class="flex flex-col justify-center items-center">
      <h3 class="text-center mt-5 font-bold">No care teams on record</h3>
      <h2 class="text-xs text-gray-400">
        Care teams added will be displayed here.
      </h2>
    </div>
    <button
      class="bg-danger rounded-md text-white mt-5 py-2 px-3 focus:outline-none hover:opacity-90"
      @click="$router.push('add-careteam')"
    >
      Create a Care Team
    </button>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  components: {},
})
export default class DomainEmptyState extends Vue {}
</script>
