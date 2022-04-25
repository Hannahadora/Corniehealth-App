<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title>
        <cornie-icon-btn @click="handleCancel">
          <arrow-left-icon />
        </cornie-icon-btn>
        <span
          class="text-primary font-extrabold text-lg border-l-2 border-gray-100 pl-2"
        >
          Insurance
        </span>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <p class="text-sm mb-5">Fill the form below to add Insurance.</p>
        <v-form ref="form" class="grid grid-cols-1 gap-y-2">
          <cornie-input
            label="Owner"
            class="w-full"
            placeholder="Enter"
            v-model="owner"
          />
          <cornie-input
            label="Payer"
            class="w-full"
            placeholder="--Enter--"
            v-model="payor"
          />
          <cornie-select
            label="Prority"
            class="w-full"
            placeholder="Select One"
            :items="['one', 'two']"
            v-model="priority"
          />
          <cornie-input
            label="Group Policy ID"
            class="w-full"
            placeholder="Select One"
            v-model="groupPolicyNo"
          />
           <cornie-input
            label="Description"
            class="w-full"
            placeholder="Enter"
            v-model="description"
          />

            <cornie-input
            label="plan"
            class="w-full"
            placeholder="Enter"
            v-model="plan"
          />
           <cornie-input
            label="Policy Number"
            class="w-full"
            placeholder="Enter"
            v-model="policyNo"
          />
          <cornie-input
            label="Coverage"
            class="w-full"
            placeholder="--Enter--"
            v-model="coverage"
          />

          <cornie-input
            label="Excess"
            class="w-full"
            placeholder="Enter"
            v-model="excess"
          />
           <cornie-input
            label="Deductible/Co-Pay Amt."
            class="w-full"
            placeholder="Enter"
            v-model="deductible"
          />
        
          <cornie-date-picker
            label="End Date/Time"
            class="w-full"
            v-model="endDate"
          />

          <cornie-date-picker
            label="Start Date/Time"
            class="w-full mt-4"
            v-model="startDate"
          />
        
        
        </v-form>
      </cornie-card-text>
      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="handleCancel"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="save"
            class="text-white bg-danger px-6 rounded-xl"
          >
            Save
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieDatePicker from "@/components/datepicker.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import { Insurance, IPatient } from "@/types/IPatient";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";

const patients = namespace("patients");

@Options({
  name: "InsuranceDialog",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    CornieDialog,
    CornieInput,
    CornieSelect,
    CorniePhoneInput,
    CornieDatePicker,
    CornieBtn,
  },
  emits: ["canceled"],
})
export default class InsuranceDialog extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Object })
  patient!: IPatient;

  @Prop({ type: Object })
  insurances!: Insurance[];

  @PropSync("insurances")
  insuranceSync!: Insurance[];

  @patients.Action
  updatePatientField!: (data: {
    id: string;
    field: string;
    data: any[];
  }) => void;

  type = "";
  group = "";
  payer = "";
  plan = "";
  policyNo = "";
  deductible = "";
  mainPolicyHolder = "";
  groupPolicyNo = "";
  loading = false;
  policyExpiry = "";

  owner = "";
  payor = "";
  priority = "";
  description = "";
  coverage = "";
  excess = "";
  endDate = "";
  startDate = "";



  currentId = "";

  get payload() {
    const payload = {
      patientId: this?.patient?.id,
      mainPolicyHolder: this.owner,
      payer: this.payor,
      type: this.priority,
      plan: this.plan,
      policyNo: this.policyNo,
      deductible: this.deductible,
      description: this.description,
      groupPolicyNo: this.groupPolicyNo,
      coverage: this.coverage,
      excess: this.excess,
      policyExpiry: this.endDate,
      policyStartDate: this.startDate,
    } as Insurance;
    if (this.patient?.id) payload.patientId = this.patient.id;
    if (this.currentId) payload.id = this.currentId;
    return payload;
  }
  async save() {
    const report = await (this.$refs.form as any).validate();
    if (!report.valid) return;
    this.loading = true;
    if (this.patient) await this.submit();
    else this.batch();
    this.loading = false;
  }

  handleCancel() {
    this.$emit("canceled");
    this.show = false;
  }

  batch() {
  //  this.insurances.push(this.payload);
    this.$emit('setInsurance', this.payload);
    window.notify({
        msg: `Insurance added successfully`,
        status: "success",
      });

    this.show = false;
   // this.insuranceSync = [...this.insuranceSync, this.payload];
  }

  async submit() {
    const action = this.currentId ? "Updated" : "Created";
    let result: any;
    try {
      if (this.currentId) result = await this.update();
      else result = await this.createNew();
      window.notify({
        msg: `Insurance ${action} successfully`,
        status: "success",
      });
    } catch (error) {
      window.notify({ msg: `Insurance not ${action}`, status: "error" });
    }
    if (result) this.updatePatient(result);
  }

  updatePatient(data: any) {
    this.updatePatientField({
      id: this.patient.id!!,
      field: "insurances",
      data: [data],
    });
  }

  async createNew() {
    const response = await cornieClient().post(
      "/api/v1/patient/insurance",
      this.payload
    );
    return response.data;
  }
  async update() {
    const response = await cornieClient().put(
      `/api/v1/patient/insurance/${this.currentId}`,
      this.payload
    );
    return response.data;
  }
  hydrate() {
    const insurances = this.patient.insurances;
    if (!insurances || !insurances.length) return;
    const [insurance, ..._] = insurances;
    if (!insurance) return;
    this.type = insurance.type || "";
    this.group = insurance.group || "";
    this.payer = insurance.payer || "";
    this.plan = insurance.plan || "";
    this.policyNo = insurance.policyNo || "";
    this.policyExpiry = (insurance.policyExpiry as string) || "";
    this.mainPolicyHolder = insurance.mainPolicyHolder || "";
    this.deductible = insurance.deductible || "";
    this.currentId = insurance.id || "";
  }

  @Watch("patient")
  patientChanged() {
    if (this.patient?.id) this.hydrate();
  }

  created() {
    if (this.patient?.id) this.hydrate();
  }
}
</script>

<style></style>
