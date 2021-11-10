<template>
  <div class="p-3 w-full overflow-auto">
    <router-view />
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
