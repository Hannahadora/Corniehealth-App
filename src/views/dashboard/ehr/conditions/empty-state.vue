<template>
  <div class="block w-full">
    <cornie-empty-state
      heading="Patient currently have no condition"
      subheading=""
    >
      <template #icon>
        <img src="@/assets/img/allergy.svg" />
      </template>
      <template #actions>
        <div class="flex justify-center">
          <cornie-btn
            @click="addCondition = true"
            class="bg-danger text-white m-5 py-1"
          >
            Add New Condition
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
