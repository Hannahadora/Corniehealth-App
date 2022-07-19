<template>
  <cornie-dialog v-model="show" center class="w-4/12 h-2/3">
    <cornie-card height="100%" class="flex flex-col bg-white">
      <cornie-card-title>
        <div class="w-full flex items-center justify-between">
          <div class="w-full flex items-center">
            <span class="pr-2 flex items-center cursor-pointer border-r-2">
              <cornie-icon-btn @click="show = false">
                <arrow-left-icon />
              </cornie-icon-btn>
            </span>

            <h2 class="font-bold text-lg text-primary ml-3 -mt-0.5">
              Update Status
            </h2>
          </div>
          <delete-icon
            class="text-danger fill-current cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
      <cornie-card-text class="overflow-y-auto">
        <div class="flex rounded-md cursor-pointer">
          <span
            @click="active = 'clinical'"
            :class="{ 'bg-primary text-white': active == 'clinical' }"
            class="flex-grow rounded-l-md block p-3"
          >
            Clinical Status
          </span>
          <span
            @click="active = 'verification'"
            :class="{ 'bg-primary text-white': active == 'verification' }"
            class="flex-grow py-3 pr-3 rounded-r-md block pl-8"
          >
            Verification Status
          </span>
        </div>
        <v-form ref="form">
          <div class="grid grid-cols-1 gap-3 mt-2">
            <cornie-input
              disabled
              :modelValue="currentStatus"
              label="Current Status"
              class="w-full"
            />
            <cornie-input
              disabled
              :modelValue="updatedBy"
              label="Updated By"
              class="w-full"
            />
            <date-picker
              disabled
              :modelValue="lastUpdated"
              label="Date Last Updated"
            />
            <cornie-select
              label="Update Status"
              :items="statuses"
              v-model="newStatus"
              class="w-full"
              :rules="required"
            />
          </div>
        </v-form>
      </cornie-card-text>
      <div class="flex justify-end mx-4 mt-auto mb-4">
        <cornie-btn
          @click="show = false"
          class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
        >
         Cancel
        </cornie-btn>
        <cornie-btn
        v-if="active == 'clinical'"
          @click="setStatus"
          :loading="loading"
          class="text-white bg-danger px-9 rounded-xl"
        >
          Update
        </cornie-btn>
         <cornie-btn
         v-else
          @click="setVerifyStatus"
          :loading="loading"
          class="text-white bg-danger px-9 rounded-xl"
        >
          Update
        </cornie-btn>
      </div>
    </cornie-card>
    <status-history v-model="showHistory" :histories="histories" />
  </cornie-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieDialog from "@/components/CornieDialog.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieCard from "@/components/cornie-card";
import DeleteIcon from "@/components/icons/cancel.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import DatePicker from "@/components/datepicker.vue";
import { verificationStatuses, clinicalStatuses } from "./drop-downs";
import StatusHistory from "./status-history.vue";
import { ICondition } from "@/types/ICondition";
import { string } from "yup";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import CornieIconBtn from "@/components/CornieIconBtn.vue";

const condition = namespace("condition");

@Options({
  name: "ConditionStatusUpdate",
  components: {
    CornieDialog,
    StatusHistory,
    ArrowLeftIcon,
    CornieIconBtn,
    DatePicker,
    ...CornieCard,
    CornieSelect,
    CornieInput,
    DeleteIcon,
  },
})
export default class StatusUpdate extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Object })
  condition!: ICondition;

  showHistory = false;

  active = "clinical";

  required = string().required();

  newStatus = "";

  loading = false;

  @condition.Mutation
  setPatientConditions!: ({
    patientId,
    conditions,
  }: {
    patientId: string;
    conditions: ICondition[];
  }) => Promise<void>;

  get statuses() {
    return this.active == "clinical" ? clinicalStatuses : verificationStatuses;
  }

  get currentStatus() {
    return this.active == "clinical"
      ? this.condition.clinicalStatus
      : this.condition.verificationStatus;
  }

  get histories() {
    const histories =
      this.active == "clinical"
        ? this.condition.clinicalStatusHistory
        : this.condition.verificationSatusHistory;
    return histories || [];
  }

  get updatedBy() {
    const histories = this.histories;
    const latest = [...histories].pop();
    return latest?.practitionerName || "";
  }

  get lastUpdated() {
    const dateString = this.condition.updatedAt;
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  // async submit() {
  //   const { valid } = await (this.$refs.form as any).validate();
  //   if (!valid) return;
  //   this.loading = true;
  //   const type =
  //     this.active == "clinical" ? "clinical-status" : "verification-status";
  //   const payload = { status: this.newStatus };
  //   await this.setStatus(payload, type);
  //   this.loading = false;
  // }

  async setStatus(payload: any, type: string) {
    this.loading = true;
    try {
      const { data } =  await cornieClient().patch(`/api/v1/condition/clinical-status/${this.condition.id}`, { status: this.newStatus })
      window.notify({ status: "success", msg: "Status updated" });
      this.done();
      this.loading = false;
    } catch (error:any) {
      window.notify({ status: "error", msg: "Status not updated" });
    }
    this.loading = false;
  }

  async setVerifyStatus(payload: any, type: string) {

     this.loading = true;
    try {
      const { data } =  await cornieClient().patch(`/api/v1/condition/verification-status/${this.condition.id}`, { status: this.newStatus })
      window.notify({ status: "success", msg: "Status updated" });
      this.done();
      this.loading = false;
    } catch (error:any) {
      window.notify({ status: "error", msg: "Status not updated" });
    }
    this.loading = false;
  }

  
  done() {
    this.show = false;
    this.$emit("conditionAdded");
  }

  updateCondition(condition: ICondition) {
    const payload = { patientId: condition.patientId, conditions: [condition] };
    this.setPatientConditions(payload);
  }
}
</script>
