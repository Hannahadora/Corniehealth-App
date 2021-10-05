<template>
  <empty-state v-if="isEmpty" />
  <existing-state v-else />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import EmptyState from "./empty-state.vue";
import ExistingState from "./existing-state.vue";

@Options({
  name: "conditions",
  components: {
    EmptyState,
    ExistingState,
  },
})
export default class Conditions extends Vue {
  get isEmpty() {
    return true;
  }
}
</script>
