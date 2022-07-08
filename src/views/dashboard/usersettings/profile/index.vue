<template>
  <div class="mt-2 mb-5 rounded-lg w-full overflow-auto h-full bg-white">
    <div class="p-3 w-full h-full">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts">
  import { Options, Vue } from "vue-class-component";

  @Options({
    components: {},
  })
  export default class UseIndex extends Vue {}
</script>
<style>
  /* Hide scrollbar for Chrome, Safari and Opera */
  .topest::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .topest {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
</style>
