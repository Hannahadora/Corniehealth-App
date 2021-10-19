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
            @click="addCondition = true"
            class="bg-danger text-white m-5 p-2"
          >
            Add Progress Note
          </cornie-btn>
        </div>
      </template>
    </cornie-empty-state>
    <add-condition v-model="addCondition" />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieEmptyState from "@/components/CornieEmptyState.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import AddCondition from "./add-condition.vue";

@Options({
  name: "ConditionEmptyState",
  components: {
    CornieEmptyState,
    AddCondition,
    CornieBtn,
  },
})
export default class EmptyState extends Vue {
  addCondition = false;
}
</script>
