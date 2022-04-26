<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card
      height="100%"
      class="flex flex-col h-full bg-white px-6 overflow-y-scroll"
    >
      <cornie-card-title class="">
        <icon-btn @click="show = false">
          <arrow-left stroke="#ffffff" />
        </icon-btn>
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Update Status
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <v-form class="flex-grow flex flex-col" @submit="submit">
          <cornie-input
            class="w-full"
            label="Current Status"
            placeholder="Current Status"
            v-model="currentStatus"
            :disabled="true"
            :rules="required"
          />
          <cornie-input
            class="w-full"
            label="Updated By"
            placeholder="Updated By"
            v-model="updatedBy"
            :disabled="true"
            :rules="required"
          />
          <date-picker
            class="w-full"
            label="Last Updated"
            v-model="lastUpdated"
            :rules="required"
          />

          <cornie-select
            class="w-full mt-6"
            label="Update Status"
            placeholder="--Select one--"
            v-model="newStatus"
            :items="statuses"
          />
        </v-form>
      </cornie-card-text>

      <div class="flex items-center justify-end mt-24">
        <div class="flex items-center mb-6">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 py-1 mr-3 rounded-lg text-primary"
          >
            View History
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            type="submit"
            class="text-white bg-danger px-3 py-1 rounded-lg"
          >
            Update
          </cornie-btn>
        </div>
      </div>
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieCard from "@/components/cornie-card";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import IconBtn from "@/components/CornieIconBtn.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CustomCheckbox from "@/components/custom-checkbox.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieBtn from "@/components/CornieBtn.vue";
import { namespace } from "vuex-class";
import { CornieUser } from "@/types/user";
import { string } from "yup";
import AutoComplete from "@/components/autocomplete.vue";
import { cornieClient } from "@/plugins/http";
import CornieRadio from "@/components/cornieradio.vue";
import IDispenseInfo from "@/types/IDispenseInfo";

import DatePicker from "@/components/daterangepicker.vue";
import { first, getTableKeyValue } from "@/plugins/utils";

const hierarchy = namespace("hierarchy");
const orgFunctions = namespace("OrgFunctions");
const user = namespace("user");
const appointmentRoom = namespace("appointmentRoom");

@Options({
  name: "UpdateStatusModal",
  components: {
    CornieDialog,
    ...CornieCard,
    ArrowLeft,
    IconBtn,
    CornieInput,
    CornieSelect,
    CustomCheckbox,
    CornieBtn,
    AutoComplete,
    CornieRadio,
    DatePicker,
    CancelIcon,
  },
})
export default class DispenseModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: Object, default: "" })
  request!: IDispenseInfo;

  required = string().required();

  loading = false;

  newStatus = "";

  get currentStatus() {
    return "";
  }

  get updatedBy() {
    return this.request?.performer?.name;
  }

  get statuses() {
    return ["Active", "Substituted", "On-Hold", "Dispensed"];
  }

  get lastUpdated() {
     return new Date(this.request?.updatedAt).toLocaleString();
  }

  submit() {

  }

}
</script>

<style scoped>
td {
  padding: 16px;
}
</style>
