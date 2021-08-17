<template>
  <div
    class="mt-2 mb-5 rounded-lg bg-white w-full overflow-auto"
  >
    <div class="p-3 w-full overflow-auto">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({
  components: {
  },
})
export default class Settings extends Vue {}
</script>
<style scoped>
</style>
