<template>
  <div class="h-full flex justify-center">
    <device-empty-state v-if="false" />
    <device-existing-state />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DeviceEmptyState from "./emptyState.vue";
import DeviceExistingState from "./existingState.vue";

@Options({
  components: {
    DeviceEmptyState,
    DeviceExistingState,
  },
})
export default class Devices extends Vue {}
</script>
