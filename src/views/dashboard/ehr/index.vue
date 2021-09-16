<template>
  <div
    class="mt-2 mb-5  rounded-lg settings"
  >
    <div class="w-full p-3 h-screen max-h-full">
      <clinical-sidebar  class="pb-56"/>
    </div>
    <div class="p-3 w-full  overflow-auto h-screen pb-72 max-h-full">
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
