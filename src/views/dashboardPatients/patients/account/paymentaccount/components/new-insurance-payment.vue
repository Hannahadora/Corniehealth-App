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
        :items="['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']"
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
  import { cornieClient } from "@/plugins/http";
  import IPractitioner from "@/types/IPractitioner";
  import ClinicalDialog from "@/views/dashboard/ehr/conditions/clinical-dialog.vue";
  import { Options, Vue } from "vue-class-component";
  import { PropSync } from "vue-property-decorator";
  import { namespace } from "vuex-class";

  const account = namespace("user");

  @Options({
    components: {
      ClinicalDialog,
      CornieRadio,
      CornieInput,
      CornieSelect,
      DateTimePicker,
    },
    emits: ["reloadPayment"],
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

    @account.Getter
    corniePatient!: any;

    @account.Mutation
    updatePractitioner!: (practitioners: IPractitioner[]) => void;

    @account.Getter
    authPractitioner!: IPractitioner;

    async mounted() {
      await this.updatePractitioner(this.authPractitioner as any);
    }

    get payload() {
      return {
        // id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        accountType: this.corniePatient?.accountType,
        type: "insure-pri",
        ownerId: this.corniePatient?.id,
        insurance: {
          patientId: this.corniePatient?.id,
          priority: this.priority,
          payer: this.payor,
          plan: this.plan,
          policyNo: this.policy,
          policyExpiry: this.period.end,
          deductible: this.detuctable,
          mainPolicyHolder: this.owner,
          groupPolicyId: this.groupPolicyId,
          description: this.description,
          coverage: this.coverage,
          excess: Number(this.excess) || 0,
          policyStartDate: this.period.start,
        },
      };
    }
    validate() {
      //@ts-ignore
      return Object.values(this.payload.insurance).every((x) => x !== "");
    }
    async save() {
      console.log("Saving payload", this.validate());
      if (!this.validate()) {
        window.notify({
          msg: "All fields are required",
          status: "error",
        });
        return;
      }
      try {
        const response = await cornieClient().post(
          `/api/v1/patient-portal/payment`,
          this.payload
        );
        window.notify({
          msg: "Payment account added successfully",
          status: "success",
        });
        this.show = false;
        this.$emit("reloadPayment");
      } catch (error) {
        window.notify({
          msg: "Error updating payment account",
          status: "error",
        });
      }
    }
  }
</script>
