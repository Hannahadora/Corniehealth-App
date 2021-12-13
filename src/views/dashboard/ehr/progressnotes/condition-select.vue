<template>
  <auto-complete
    v-bind="$attrs"
    v-model="practitioner"
    :filter="filter"
    :items="items"
  >
    <template #item="{ item }">
      <div class="w-full flex items-center my-1 justify-between">
        <div class="flex items-center">
          <!-- <avatar :src="item.image" /> -->
          <div class="flex ml-1 flex-col">
            <span class="text-xs">{{ item.id }}</span>
          </div>
        </div>
        <span class="text-xs font-semibold text-gray-500">
          {{ item.id }}
        </span>
      </div>
    </template>
  </auto-complete>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AutoComplete from "@/components/autocomplete.vue";
import Avatar from "@/components/avatar.vue";
import { namespace } from "vuex-class";
import IPractitioner from "@/types/IPractitioner";
import { Prop, PropSync } from "vue-property-decorator";
import { printPractitioner } from "@/plugins/utils";

import { ICondition } from "@/types/ICondition";

const condition = namespace("condition");

import { Codeable } from "@/types/misc";
import Condition from "yup/lib/Condition";

const practitioners = namespace("practitioner");

@Options({
  name: "ConditionSelect",
  components: {
    Avatar,
    AutoComplete,
  },
})
export default class ConditionSelect extends Vue {
  @condition.Action
  fetchPatientConditions!: (patientId: string) => Promise<ICondition>;

  femCondition!: ICondition;

  // @patients.Action
  // findPatient!: (patientId: string) => Promise<IPatient>;

  @Prop({ type: [], default: [], required: true })
  NewfemCondition!: any;

  //  @Prop({ type: Object, required: true })
  // patient!: IPatient;

  @Prop({ type: String, default: "" })
  modelValue!: string;

  @PropSync("modelValue")
  practitioner!: string;

  @Prop({ type: String, default: "" })
  patientId!: string;

  @practitioners.State
  practitioners!: IPractitioner[];

  // @condition.State
  // patientConditions!: ICondition[];

  get items() {
    const current_condition = this.NewfemCondition;
    return current_condition;
  }

  @practitioners.Action
  fetchPractitioners!: () => Promise<void>;

  filter(practitioner: IPractitioner, query: string) {
    const name =
      `${practitioner.firstName} ${practitioner.lastName}`.toLowerCase();
    const department = practitioner.department?.toLowerCase() || " ";
    const searchParam = query.toLowerCase();
    return department.includes(searchParam) || name.includes(searchParam);
  }

  get items2() {
    return this.practitioners.map((practitioner) => ({
      ...practitioner,
      code: practitioner.id,
      display: printPractitioner(practitioner),
    }));
  }

  @condition.State
  conditions!: { [state: string]: ICondition[] };

  // get patientId() {
  //   return this.$route.params.patientId as string;
  // }

  get patientConditions() {
    return this.conditions[this.patientId] || [];
  }

  get MyConditions() {
    return this.fetchPatientConditions(this.patientId);
  }

  get items3() {
    return this.patientConditions.map((condition) => ({
      ...condition,
      code: condition.id,
    }));
  }

  async created() {
    this.femCondition = await this.fetchPatientConditions(this.patientId);
    if (!this.practitioners?.length) this.fetchPractitioners();
    // this.patient = await this.findPatient(this.patientId)
    ;
  }
}
</script>
