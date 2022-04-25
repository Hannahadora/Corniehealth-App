<template>
  <cornie-dialog v-model="show" right class="w-2/3 h-full">
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
            Create Observation
          </h2>
          <cancel-red-bg
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
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-6 py-6">
              <cornie-select
                class="w-full"
                label="Based On"
                placeholder="Select"
                v-model="basedOn"
                :items="statuses"
              />
              <cornie-select
                class="w-full"
                label="Part of"
                placeholder="Select"
                v-model="partOf"
                :items="basis"
              />
              <cornie-select
                class="w-full"
                label="Category"
                placeholder="Select"
                v-model="category"
                :items="basis"
              />
              <cornie-select
                class="w-full"
                label="Code"
                placeholder="Select"
                v-model="code"
                :items="statuses"
              />
              <cornie-select
                class="w-full"
                label="Subject"
                placeholder="Select"
                v-model="subject"
                :items="statuses"
              />
              <cornie-select
                class="w-full"
                label="Focus"
                placeholder="Select"
                v-model="focus"
                :items="statuses"
              />
              <cornie-select
                class="w-full"
                label="Encounter"
                placeholder="Select"
                v-model="encounter"
                :items="statuses"
              />
            </div>
          </accordion-component>
          <accordion-component
            class="shadow-none rounded-none border-none text-primary"
            title="Effective"
            :opened="false"
          >
            <div class="grid grid-cols-3 gap-3 mt-6 w-1/2">
              <cornie-radio
                :name="name"
                v-model="type"
                label="Date/Time"
                value="date-time"
              />
              <cornie-radio
                :name="name"
                v-model="type"
                value="period"
                label="Period"
              />
              <cornie-radio
                :name="name"
                v-model="type"
                value="instant"
                label="Instant"
              />
            </div>
            <div class="grid grid-cols-2 gap-6 py-6">
              <date-time-picker
                class="w-full"
                label="Start Date/Time"
                v-model:date="issuedDate"
                v-model:time="issuedTime"
                v-if="type == 'period'"
              />
              <date-time-picker
                class="w-full"
                label="End Date/Time"
                v-model:date="issuedDate"
                v-model:time="issuedTime"
                v-if="type == 'period'"
              />
              <date-time-picker
                class="w-full"
                label="Date/Time"
                v-model:date="issuedDate"
                v-model:time="issuedTime"
                v-if="type == 'date-time' || type == 'instant'"
              />
              <cornie-select
                class="w-full"
                label="Timezone"
                placeholder="Select"
                v-model="timezone"
                :items="statuses"
                v-if="type == 'instant'"
              />
            </div>
          </accordion-component>
          <accordion-component
            class="shadow-none rounded-none border-none text-primary"
            title="Value"
            :opened="false"
          >
            <div class="flex flex-wrap space-x-8 space-y-4 mt-6">
              <cornie-radio
                :name="name"
                class="mr-4"
                v-model="valueType"
                label="Quantity"
                value="quantity"
              />
              <cornie-radio
                :name="name"
                class="mr-4"
                v-model="valueType"
                value="code"
                label="Code"
              />
              <cornie-radio
                :name="name"
                class="mr-4"
                v-model="valueType"
                value="string"
                label="String"
              />
              <cornie-radio
                :name="name"
                class="mr-4"
                v-model="valueType"
                value="boolean"
                label="Boolean"
              />
              <cornie-radio
                :name="name"
                class="mr-4"
                v-model="valueType"
                value="integer"
                label="Integer"
              />
              <cornie-radio
                :name="name"
                class="mr-4"
                v-model="valueType"
                value="range"
                label="Range"
              />
              <cornie-radio
                :name="name"
                class="mr-4"
                v-model="valueType"
                value="ratio"
                label="Ratio"
              />
              <cornie-radio
                :name="name"
                class="mr-4"
                v-model="valueType"
                value="sample-data"
                label="Sample Data"
              />
              <cornie-radio
                :name="name"
                class="mr-4"
                v-model="valueType"
                value="time"
                label="Time"
              />
              <cornie-radio
                :name="name"
                class="mr-4"
                v-model="valueType"
                value="date-time"
                label="Date/Time"
              />
              <cornie-radio
                :name="name"
                class="mr-4"
                v-model="valueType"
                value="period"
                label="Period"
              />
            </div>

            <div class="grid grid-cols-2 gap-6 mt-6">
              <cornie-input
                class="w-full"
                :label="valueType"
                :placeholder="'Enter' || { '1:1': valueType == 'ratio' }"
                v-model="selectedVal"
                :rules="required"
                v-if="
                  valueType == 'quantity' ||
                  valueType == 'code' ||
                  valueType == 'string' ||
                  valueType == 'integer' ||
                  valueType == 'sample-data' ||
                  valueType == 'ratio'
                "
              />
            </div>

            <div class="grid grid-cols-2 gap-6 mt-6">
              <date-time-picker
                class="w-full"
                label="Start Date/Time"
                v-model:date="issuedDate"
                v-model:time="issuedTime"
                v-if="valueType == 'period'"
              />
              <date-time-picker
                class="w-full"
                label="End Date/Time"
                v-model:date="issuedDate"
                v-model:time="issuedTime"
                v-if="valueType == 'period'"
              />
              <date-time-picker
                class="w-full"
                label="Date/Time"
                v-model:date="issuedDate"
                v-model:time="issuedTime"
                v-if="valueType == 'date-time' || valueType == 'time'"
              />
            </div>

            <div v-if="valueType == 'boolean'">
              <div class="font-bold text-base">Boolean</div>
              <div class="grid grid-cols-3 gap-3 mt-6 w-1/3">
                <cornie-radio
                  :name="name"
                  v-model="booleanValue"
                  label="Yes"
                  value="yes"
                />
                <cornie-radio
                  :name="name"
                  v-model="booleanValue"
                  value="no"
                  label="No"
                />
              </div>
            </div>
            <div
              class="grid grid-cols-2 gap-6 mt-2"
              v-if="valueType == 'range'"
            >
              <div class="flex items-start">
                <div class="w-11/12">
                  <cornie-input
                    class="mr-1"
                    label="Range(min)"
                    placeholder="0"
                    v-model="minRange"
                    :rules="required"
                  />
                </div>
                <cornie-select
                  placeholder="Days"
                  class="ml-1 font-bold bg-blue-900 text-white"
                  :items="['Days']"
                  v-model="minRangeP"
                  label="'"
                />
              </div>
              <div class="flex items-start">
                <div class="w-11/12">
                  <cornie-input
                    class="mr-1"
                    label="Range(max)"
                    placeholder="0"
                    v-model="maxRange"
                    :rules="required"
                  />
                </div>
                <div class="">
                  <cornie-select
                    placeholder="Days"
                    class="ml-1 font-bold bg-blue-900 text-white"
                    :items="['Days']"
                    v-model="maxRangeP"
                    label="'"
                  />
                </div>
              </div>
            </div>
          </accordion-component>
          <accordion-component
            class="shadow-none rounded-none border-none text-primary"
            title="Reason Info"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-6 py-6">
              <cornie-select
                class="w-full"
                label="Date Absent Reason"
                placeholder="Select"
                v-model="low"
                :items="low"
              />
              <cornie-select
                class="w-full"
                label="Interpretion"
                placeholder="Interpretion"
                v-model="high"
                :items="statuses"
              />

              <cornie-input
                class="w-full"
                label="Note"
                placeholder="Note"
                v-model="note"
                :rules="required"
              />
              <cornie-select
                class="w-full"
                label="Body Site"
                placeholder="Select"
                v-model="bodySite"
                :items="bodySite"
              />
              <cornie-select
                class="w-full"
                label="Method"
                placeholder="Method"
                v-model="method"
                :items="basis"
              />
              <cornie-select
                class="w-full"
                label="Specimen"
                placeholder="Enter"
                v-model="specimen"
                :items="basis"
              />
              <cornie-select
                class="w-full"
                label="Device"
                placeholder="Device"
                v-model="device"
                :items="basis"
              />
            </div>
          </accordion-component>

          <accordion-component
            class="shadow-none rounded-none border-none text-primary"
            title="Reference Range"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-6 py-6">
              <cornie-select
                class="w-full"
                label="Low"
                placeholder="Select"
                v-model="low"
                :items="low"
              />
              <cornie-select
                class="w-full"
                label="high"
                placeholder="High"
                v-model="high"
                :items="statuses"
              />
              <cornie-select
                class="w-full"
                label="Type"
                placeholder="Select"
                v-model="type"
                :items="type"
              />
              <cornie-select
                class="w-full"
                label="Applies To"
                placeholder="Select"
                v-model="appliesTo"
                :items="basis"
              />
              <cornie-select
                class="w-full"
                label="Age"
                placeholder="Enter"
                v-model="age"
                :items="basis"
              />
              <cornie-select
                class="w-full"
                label="Text"
                placeholder="text"
                v-model="text"
                :items="basis"
              />
            </div>
          </accordion-component>
          
          <accordion-component
            class="shadow-none rounded-none border-none text-primary"
            title="Member"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-6 py-6">
              <cornie-select
                class="w-full"
                label="Has Member"
                placeholder="Select"
                v-model="hasMember"
                :items="hasMember"
              />
              <cornie-select
                class="w-full"
                label="Derived From"
                placeholder="Select"
                v-model="derivedFrom"
                :items="derivedFrom"
              />
            </div>
          </accordion-component>
          <accordion-component
            class="shadow-none rounded-none border-none text-primary"
            title="Component"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-6 py-6">
              <cornie-select
                class="w-full"
                label="Code"
                placeholder="Select"
                v-model="code"
                :items="code"
              />
            </div>
          </accordion-component>
          <accordion-component
            class="shadow-none rounded-none border-none text-primary"
            title="Value"
            :opened="false"
          >
            <div class="flex flex-wrap space-x-8 space-y-4 mt-6">
              <cornie-radio
                :name="name"
                class="mr-4"
                v-model="valueType"
                label="Quantity"
                value="quantity"
              />
              <cornie-radio
                :name="name"
                class="mr-4"
                v-model="valueType"
                value="code"
                label="Code"
              />
              <cornie-radio
                :name="name"
                class="mr-4"
                v-model="valueType"
                value="string"
                label="String"
              />
              <cornie-radio
                :name="name"
                class="mr-4"
                v-model="valueType"
                value="boolean"
                label="Boolean"
              />
              <cornie-radio
                :name="name"
                class="mr-4"
                v-model="valueType"
                value="integer"
                label="Integer"
              />
              <cornie-radio
                :name="name"
                class="mr-4"
                v-model="valueType"
                value="range"
                label="Range"
              />
              <cornie-radio
                :name="name"
                class="mr-4"
                v-model="valueType"
                value="ratio"
                label="Ratio"
              />
              <cornie-radio
                :name="name"
                class="mr-4"
                v-model="valueType"
                value="sample-data"
                label="Sample Data"
              />
              <cornie-radio
                :name="name"
                class="mr-4"
                v-model="valueType"
                value="time"
                label="Time"
              />
              <cornie-radio
                :name="name"
                class="mr-4"
                v-model="valueType"
                value="date-time"
                label="Date/Time"
              />
              <cornie-radio
                :name="name"
                class="mr-4"
                v-model="valueType"
                value="period"
                label="Period"
              />
            </div>

            <div class="grid grid-cols-2 gap-6 mt-6">
              <cornie-input
                class="w-full"
                :label="valueType"
                :placeholder="'Enter' || { '1:1': valueType == 'ratio' }"
                v-model="valueType"
                :rules="required"
                v-if="
                  valueType == 'quantity' ||
                  valueType == 'code' ||
                  valueType == 'string' ||
                  valueType == 'integer' ||
                  valueType == 'sample-data' ||
                  valueType == 'ratio'
                "
              />
            </div>

            <div class="grid grid-cols-2 gap-6 mt-6">
              <date-time-picker
                class="w-full"
                label="Start Date/Time"
                v-model:date="issuedDate"
                v-model:time="issuedTime"
                v-if="valueType == 'period'"
              />
              <date-time-picker
                class="w-full"
                label="End Date/Time"
                v-model:date="issuedDate"
                v-model:time="issuedTime"
                v-if="valueType == 'period'"
              />
              <date-time-picker
                class="w-full"
                label="Date/Time"
                v-model:date="issuedDate"
                v-model:time="issuedTime"
                v-if="valueType == 'date-time' || valueType == 'time'"
              />
            </div>

            <div v-if="valueType == 'boolean'">
              <div class="font-bold text-base">Boolean</div>
              <div class="grid grid-cols-3 gap-3 mt-6 w-1/3">
                <cornie-radio
                  :name="name"
                  v-model="booleanValue"
                  label="Yes"
                  value="yes"
                />
                <cornie-radio
                  :name="name"
                  v-model="booleanValue"
                  value="no"
                  label="No"
                />
              </div>
            </div>
            <div
              class="grid grid-cols-2 gap-6 mt-2"
              v-if="valueType == 'range'"
            >
              <div class="flex items-start">
                <div class="w-11/12">
                  <cornie-input
                    class="mr-1"
                    label="Range(min)"
                    placeholder="0"
                    v-model="minRange"
                    :rules="required"
                  />
                </div>
                <cornie-select
                  placeholder="Days"
                  class="ml-1 font-bold bg-blue-900 text-white"
                  :items="['Days']"
                  v-model="minRangeP"
                  label="'"
                />
              </div>
              <div class="flex items-start">
                <div class="w-11/12">
                  <cornie-input
                    class="mr-1"
                    label="Range(max)"
                    placeholder="0"
                    v-model="maxRange"
                    :rules="required"
                  />
                </div>
                <div class="">
                  <cornie-select
                    placeholder="Days"
                    class="ml-1 font-bold bg-blue-900 text-white"
                    :items="['Days']"
                    v-model="maxRangeP"
                    label="'"
                  />
                </div>
              </div>
            </div>
          </accordion-component>
          <accordion-component
            class="shadow-none rounded-none border-none text-primary"
            title="Reason Info"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-6 py-6">
               <cornie-select
                class="w-full"
                label="Date Absent Reason"
                placeholder="Select"
                v-model="low"
                :items="low"
              />
              <cornie-select
                class="w-full"
                label="Interpretion"
                placeholder="Interpretion"
                v-model="high"
                :items="statuses"
              />
             <cornie-input
                class="w-full"
                label="Range(min)"
                placeholder="0"
                v-model="rangeMin"
                :rules="required"
              />
              <cornie-input
                class="w-full"
                label="Range(max)"
                placeholder="0"
                v-model="rangeMax"
                :rules="required"
              />
            </div>
          </accordion-component>
        </v-form>
      </cornie-card-text>

      <div class="flex items-center justify-between mt-24">
        <div class="text-red-500 py-1 px-2 text-sm">
          Cancel
        </div>
        <div class="flex items-center mb-6">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-3 py-1 mr-3 rounded-lg text-primary"
          >
            Save As Draft
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
import CancelRedBg from "@/components/icons/cancel-red-bg.vue";
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
    CancelRedBg,
    AccordionComponent,
    PlusIcon,
  },
})
export default class ViewResult extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  required = string().required();

  loading = false;
  activeTab = "Full Payment";
  opened = true;
  type = "date-time";
  valueType = "quantity";

  basedOn = "";
  encounter = "";
  focus = "";
  subject = "";
  code = "";
  category = "";
  partOf = "";

  booleanValue = "yes";
  minRange = 0;
  maxRange = 0;
  minRangeP = "Days";
  maxRangeP = "Days";
  issuedDate = "";
  issuedTime = "";

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
