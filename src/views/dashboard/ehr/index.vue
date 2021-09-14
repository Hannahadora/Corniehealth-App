<template>
  <div
    class="mt-2 mb-5 rounded-lg settings bg-white w-full overflow-hidden"
  >
    <div class="w-full h-full p-3 border-r-2 overflow-hidden">
      <clinical-sidebar class="overflow-hidden" />
    </div>
    <div class="p-3 w-full overflow-auto">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ClinicalSidebar from "./clinicalSidebar.vue";
@Options({
  components: {
    ClinicalSidebar,
  },
})
export default class ClinicalsSidebar extends Vue {}
</script>
<style scoped>
.settings {
  display: grid;
  grid-template-columns: 25% 75%;
  height: 82vh;
}
</style>
