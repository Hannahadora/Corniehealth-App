<template>
  <cornie-dialog v-model="show" right class="w-1/2 h-full">
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
          <accordion-component
            class="shadow-none rounded-none border-none text-primary"
            title="Basic Info"
            v-model="openedS"
          >
            <div class="grid grid-cols-2 gap-6 py-6">
              <cornie-select
                class="w-full"
                label="Status"
                placeholder="status"
                v-model="status"
                :items="statuses"
              />

              <cornie-input
                class="w-full"
                label="Specimen Id"
                placeholder="Specimen Id"
                v-model="specimenId"
                :disabled="true"
                :rules="required"
              />
              <cornie-select
                class="w-full"
                label="Based On"
                placeholder="Based On"
                v-model="based"
                :items="basis"
              />

              <cornie-input
                class="w-full"
                label="Category"
                placeholder="Category"
                v-model="category"
                :disabled="true"
                :rules="required"
              />
              <cornie-select
                class="w-full"
                label="Code"
                placeholder="Code"
                v-model="code"
                :items="statuses"
              />

              <cornie-input
                class="w-full"
                label="Patient"
                placeholder="Patient"
                v-model="patient"
                :disabled="true"
                :rules="required"
              />
              <!-- <cornie-input
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
            /> -->
            </div>
          </accordion-component>
          <accordion-component
            class="shadow-none rounded-none border-none text-primary"
            title="Effective"
            v-model="openedS"
          >
            <div class="grid grid-cols-2 gap-6 py-6">
              <date-time-picker
                class="w-full"
                label="Issued"
                v-model="issued"
                :rules="required"
              />
              <date-time-picker
                class="w-full"
                label="Issued"
                v-model="issued"
                :rules="required"
              />
            </div>
          </accordion-component>
          <accordion-component
            class="shadow-none rounded-none border-none text-primary"
            title="Issue Info"
            v-model="openedS"
          >
            <div class="grid grid-cols-2 gap-6 py-6">
              <div class="col-span-2 grid grid-cols-2 gap-6">
                <date-time-picker
                  class="w-full"
                  label="Issued"
                  v-model="issued"
                  :rules="required"
                />
              </div>
              <cornie-select
                class="w-full"
                label="Performer"
                placeholder="Performer"
                v-model="performer"
                :items="statuses"
              />
              <cornie-select
                class="w-full"
                label="Result Interpreter"
                placeholder="Result Interpreter"
                v-model="resultInterpreter"
                :items="statuses"
              />
            </div>
          </accordion-component>
          <accordion-component
            class="shadow-none rounded-none border-none text-primary"
            title="Result"
            v-model="openedS"
          >
            <div class="flex items-center my-6 justify-end">
              <plus-icon />
              <span class="text-danger text-sm ml-2">Add Another</span>
            </div>
            <div class="grid grid-cols-2 gap-6 py-6">
              <cornie-select
                class="w-full"
                label="Reference Observation"
                placeholder="Reference Observation"
                v-model="refernceObs"
                :items="statuses"
              />
              <cornie-select
                class="w-full"
                label="Media(optional)"
                placeholder="Media"
                v-model="media"
                :items="statuses"
              />

              <cornie-input
                class="w-full"
                label="Comment"
                placeholder="Comment"
                v-model="comment"
                :rules="required"
              />
              <cornie-select
                class="w-full"
                label="Imaging Studying"
                placeholder="Imaging Studying"
                v-model="imgStdy"
                :items="basis"
              />
              <cornie-select
                class="w-full"
                label="Conclusion"
                placeholder="Conclusion"
                v-model="conclusion"
                :items="basis"
              />
              <cornie-select
                class="w-full"
                label="Conclusion Code"
                placeholder="Conclusion Code"
                v-model="conclusionCode"
                :items="basis"
              />
            </div>
          </accordion-component>
        </v-form>
      </cornie-card-text>

      <div class="flex items-center justify-end mt-24">
        <div class="flex items-center mb-6">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 py-1 mr-3 rounded-lg text-primary"
          >
            CAncel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            type="submit"
            class="text-white bg-danger px-3 py-1 rounded-lg"
          >
            Save
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
import PlusIcon from "@/components/icons/plus.vue";
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
import IAppointmentRoom from "@/types/IAppointmentRoom";

import DateTimePicker from "@/components/date-time-picker.vue";
import { first, getTableKeyValue } from "@/plugins/utils";

import AccordionComponent from "@/components/dialog-accordion.vue";

const hierarchy = namespace("hierarchy");
const orgFunctions = namespace("OrgFunctions");
const user = namespace("user");
const appointmentRoom = namespace("appointmentRoom");

@Options({
  name: "AppointmentRoomDialog",
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
    DateTimePicker,
    CancelIcon,
    AccordionComponent,
    PlusIcon,
  },
})
export default class ViewResult extends Vue {
  required = string().required();

  loading = false;
  activeTab = "Full Payment";

  reference = "";
  salesDate = 0;
  customers = "";
  types = "";

  get statuses() {
    return [
      "Registered",
      "Partial",
      "Preliminary",
      "Final",
      "Ammended",
      "Corrected",
      "Appended",
      "Cancelled",
      "Entered-in-Errors",
      "Unknown",
    ];
  }
}
</script>

<style scoped>
td {
  padding: 16px;
}
</style>
