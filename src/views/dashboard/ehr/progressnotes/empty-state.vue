<template>
  <div class="block w-full">
    <cornie-empty-state
      heading="There are no progress notes for this patient."
      subheading="Add a new progress note by clicking the button below"
    >
      <template #icon>
        <img src="@/assets/img/empty-condition.svg" />
      </template>
      <template #actions>
        <div class="flex justify-center">
          <cornie-btn
            @click="addingProgressnote = true"
            class="bg-danger text-white m-5 p-2"
          >
            Add Progress Notes
          </cornie-btn>
        </div>
      </template>
    </cornie-empty-state>
    <!-- <add-condition v-model="addCondition" /> -->
    <add-progress-note v-model="addingProgressnote" />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieEmptyState from "@/components/CornieEmptyState.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import AddCondition from "./add-condition.vue";
import AddProgressNote from "./add-progressnote.vue";

@Options({
  name: "ConditionEmptyState",
  components: {
    CornieEmptyState,
    AddCondition,
    CornieBtn,
    AddProgressNote,
  },
})
export default class EmptyState extends Vue {
  addCondition = false;
  addingProgressnote = false;
}
</script>
