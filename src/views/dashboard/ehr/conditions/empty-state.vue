<template>
  <div class="block w-full p-30">
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
    <add-condition v-model="addCondition" @conditionAdded="conditionAdded"/>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";

import CornieEmptyState from "@/components/CornieEmptyState.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import AddCondition from "./add-condition.vue";
import { ICondition } from "@/types/ICondition";

const condition = namespace("condition");
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

  
  @condition.Action
  fetchPatientConditions!: (patientId: string) => Promise<void>;

  get patientId() {
    return this.$route.params.id as string;
  }

   async conditionAdded(){
    await  this.fetchPatientConditions(this.patientId);
  }
}
</script>
