<template>
  <div class="p-3 w-full overflow-auto">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({
  name: "PatientsExperience",
  components: {},
})
export default class Settings extends Vue {}
</script>
<style scoped></style>
