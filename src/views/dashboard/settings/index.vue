<template>
  <div
    class="mt-2 mb-5 rounded-lg w-full overflow-auto h-full"
    :class="$route.name === 'Create a Care Team' ? '' : 'bg-white'"
  >
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
  grid-template-columns: 25% 75%;
  height: 82vh;
}
</style>
