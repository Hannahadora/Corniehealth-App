<template>
  <div class="mt-2 mb-5 rounded-lg settings bg-white w-full h-full">
    <div class="w-full h-full p-3 border-r-2">
      <settings-sidebar></settings-sidebar>
    </div>
    <div class="p-3 w-full h-full">
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
  grid-template-columns: 30% 70%;
}
</style>
