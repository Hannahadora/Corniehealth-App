<template>
  <div class="mt-2 mb-5 rounded-lg bg-white w-full overflow-auto">
    <!-- <div class="w-full h-full p-3 border-r-2 overflow-hidden">
      <settings-sidebar class="overflow-hidden" />
    </div> -->
    <div class="p-3 w-full">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SettingsSidebar from "./SettingsSidebar.vue";
import AccountSecurity from "./AccountSecurity/index.vue";
@Options({
  components: {
    SettingsSidebar,
    AccountSecurity,
  },
})
export default class Settings extends Vue {}
</script>
<style scoped>
.settings {
  display: grid;
  grid-template-columns: 25% 75%;
  height: 82vh;
}
</style>
