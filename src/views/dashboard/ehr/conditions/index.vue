<template>
  <div
    class="
      flex
      justify-center
      h-65-screen
      bg-white
      shadow-md
      p-3
      mb-2
      rounded
      w-full
    "
  >
    <div class="w-full">
      <span
        class="
          flex flex-col
          w-full
          justify-center
          border-b-2
          font-bold
          mb-10
          text-xl text-primary
          py-2
        "
      >
        Condition/Problem
      </span>
      <span class="w-full">
        <empty-state v-if="isEmpty" />
        <existing-state v-else />
      </span>
    </div>
  </div>
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
<style scoped>
.h-65-screen {
  min-height: 80vh;
}
</style>
