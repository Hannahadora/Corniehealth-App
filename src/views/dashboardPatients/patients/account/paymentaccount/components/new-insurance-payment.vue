<template>
  <clinical-dialog
    v-model="show"
    :title="'Insurance'"
    class="md:w-1/4 h-full w-full"
  >
    <div class="flex flex-col space-y-6 p-2 pb-20 overflow-y-auto">
      <cornie-input
        class="w-full mb-0"
        v-model="owner"
        label="Owner"
        placeholder="Enter"
      />
      <cornie-input
        class="w-full mt-0"
        v-model="groupPolicyId"
        label="Group Policy ID"
        placeholder="Enter"
      />
      <cornie-input
        class="w-full"
        v-model="payor"
        label="Payor"
        placeholder="Enter"
      />
      <!-- <cornie-input
        class="w-full"
        v-model="priority"
        label="Priority"
        placeholder="Enter"
      /> -->
      <cornie-select
        label="Priority"
        v-model="priority"
        placeholder="Select"
        :items="[]"
      />
      <cornie-input
        class="w-full"
        v-model="description"
        label="Description"
        placeholder="Enter"
      />
      <cornie-input
        class="w-full"
        v-model="plan"
        label="Plan"
        placeholder="Enter"
      />
      <cornie-input
        class="w-full"
        v-model="policy"
        label="Policy Number"
        placeholder="Enter"
      />
      <cornie-input
        class="w-full"
        v-model="coverage"
        label="Coverage"
        placeholder="Enter"
      />
      <cornie-input
        class="w-full"
        v-model="excess"
        label="Excess"
        placeholder="Enter"
      />
      <cornie-input
        class="w-full"
        v-model="detuctable"
        label="Deductible/Co-Pay Amt."
        placeholder="Enter"
      />
      <date-time-picker
        class="w-full"
        label="End Date/time"
        v-model:date="period.end"
        v-model:time="period.endTime"
      />
      <date-time-picker
        class="w-full"
        label="Start Date/time"
        v-model:date="period.start"
        v-model:time="period.startTime"
      />
    </div>
    <div class="absolute bottom-0 w-full">
      <div class="flex justify-end space-x-3 px-6 py-2 bg-white">
        <cornie-btn
          @click="show = false"
          class="border-primary border-2 px-1 mr-3 rounded-xl text-primary"
        >
          Cancel
        </cornie-btn>
        <cornie-btn @click="save" class="text-white bg-danger px-6 rounded-xl">
          Save
        </cornie-btn>
      </div>
    </div>
  </clinical-dialog>
</template>
<script lang="ts">
  import CornieInput from "@/components/cornieinput.vue";
  import CornieRadio from "@/components/cornieradio.vue";
  import CornieSelect from "@/components/cornieselect.vue";
  import DateTimePicker from "@/components/date-time-picker.vue";
  import ClinicalDialog from "@/views/dashboard/ehr/conditions/clinical-dialog.vue";
  import { Options, Vue } from "vue-class-component";
  import { PropSync } from "vue-property-decorator";

  @Options({
    components: {
      ClinicalDialog,
      CornieRadio,
      CornieInput,
      CornieSelect,
      DateTimePicker,
    },
  })
  export default class NewInsurancePayment extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;

    owner = "";
    groupPolicyId = "";
    payor = "";
    priority = "";
    description = "";
    plan = "";
    policy = "";
    coverage = "";
    excess = "";
    detuctable = "";
    period = {
      end: "",
      endTime: "",
      start: "",
      startTime: "",
    };
    save() {}
  }
</script>
