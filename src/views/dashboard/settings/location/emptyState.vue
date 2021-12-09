<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
    <img src="@/assets/img/empty-location.svg" />
    <h3 class="text-center mt-5">You have no locations</h3>
    <button
      class="bg-danger rounded-full text-white mt-5 py-2 px-3 focus:outline-none hover:opacity-90"
      @click="$router.push('add-location')"
    >
      New Location
    </button>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  components: {},
})
export default class LocationEmptyState extends Vue {}
</script>
