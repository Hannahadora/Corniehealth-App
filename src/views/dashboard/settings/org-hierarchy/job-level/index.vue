<template>
  <div class="block w-full h-full">
    <empty-state v-if="empty" />
    <existing-state v-else />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import EmptyState from "./empty-state.vue";
import ExistingState from "./existing-state.vue";

@Options({
  name: "JobLevelIndex",
  components: {
    EmptyState,
    ExistingState,
  },
})
export default class JobLevelIndex extends Vue {
  get empty() {
    return false;
  }
}
</script>
