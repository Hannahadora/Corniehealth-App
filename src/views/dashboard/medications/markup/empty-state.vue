<template>
  <div class="flex items-center flex-col justify-center h-full gap-8">
    <img src="@/assets/markup-discount-empty-state.svg" />
    <div class="text-center">
      <h1 class="font-bold text-sm">No Markup & Discounts on Record</h1>
      <h1 class="text-gray-400 text-sm font-normal">
        Markups & Discounts added will be displayed here
      </h1>
    </div>

    <button
      class="bg-danger text-base font-semibold rounded-md text-white py-2 px-14"
      @click="$router.push('/dashboard/provider/settings/markup-settings')"
    >
      Setup
    </button>
  </div>
</template>

<script>
import { Options, Vue } from "vue-class-component";

@Options({
  name: "EmptyState",
})
export default class EmptyState extends Vue {}
</script>
