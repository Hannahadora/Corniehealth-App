<template>
  <main class="">
    <empty-state
      heading="No job level recorded"
      subheading="Add new job level"
      class="mt-6"
      v-if="isEmpty"
    >
      <template #icon>
        <img src="@/assets/img/step.svg" class="inline-block mr-2" />
      </template>
      <template #actions>
        <button
          class="
            bg-danger
            rounded-full
            text-white
            py-2
            px-6
            mt-5
            focus:outline-none
            hover:opacity-90
          "
          @click="addLevel = true"
        >
          <img src="@/assets/img/plus.svg" class="inline-block mr-2" />
          New Job Level
        </button>
      </template>
    </empty-state>
    <existing-state v-else />
    <add-level v-model="addLevel" />
  </main>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import EmptyState from "@/components/CornieEmptyState.vue";
import AddLevel from "./add-level.vue";
import ExistingState from "./ExistingState.vue";

@Options({
  name: "Designations",
  components: {
    EmptyState,
    AddLevel,
    ExistingState,
  },
})
export default class Functions extends Vue {
  addLevel = false;

  get isEmpty() {
    return true;
  }
}
</script>

<style></style>
