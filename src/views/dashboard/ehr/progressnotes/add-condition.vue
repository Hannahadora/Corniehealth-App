<template>
  <clinical-dialog
    v-model="show"
    title="New Progress Note"
    subtext="All Fields are required"
    class=""
  >
    <div class="flex items-center justify-between mt-3">
      <p class="text-xs">Started: 9:15am, 22 September,2021</p>
      <p class="text-xs">Duration: 30 min</p>
      <cornie-btn
        class="border-danger border-2 px-6 mr-3 rounded-xl text-danger"
      >
        End
      </cornie-btn>
    </div>
    <v-form ref="form">
      <accordion-component
        class="shadow-none rounded-none border-none text-primary mb-5"
        title="Subjective"
        :opened="false"
      >
        <div class="flex items-center justify-between mt-3">
          <h3 class="text-sm">Chief Complaint</h3>
          <dots-horizontal-icon class="mr-7" />
        </div>

        <div class="grid grid-cols-2 text-center gap-3 mt-5">
          <cornie-input v-model="complaint" label="Chief Complaint" />
          <div
            class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"
          >
            <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
                clip-rule="evenodd"
                fill-rule="evenodd"
              ></path>
            </svg>
          </div>
        </div>

        <div class="relative text-gray-700">
          <input
            class="w-full h-10 pl-3 pr-8 text-base focus:outline-none placeholder-gray-600 border rounded-lg focus:shadow-outline"
            type="text"
            placeholder="Regular input"
          />
          <div
            class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"
          >
            <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
                clip-rule="evenodd"
                fill-rule="evenodd"
              ></path>
            </svg>
          </div>
        </div>

        <div class="flex items-center justify-between mt-3 mb-2">
          <h3 class="text-sm">History of Present Sickness (HPI)</h3>
          <dots-horizontal-icon class="mr-7" />
        </div>

        <div class="grid grid-cols-2 gap-3 mt-5">
          <cornie-input v-model="status" label="Status" />
          <cornie-input v-model="severity" label="Severity" />
          <cornie-input v-model="onset" label="Onset" />
          <cornie-input v-model="abatement" label="Abatement" />

          <cornie-input v-model="stage" label="Stage" />

          <!-- <cornie-select
            v-model="severity"
            label="Severity"
            :items="verificationStatuses"
            :rules="required"
          />
          <auto-complete
            v-model="category"
            :rules="required"
            :items="categories"
            label="Onset"
          />
          <cornie-select
            v-model="severity"
            label="Abatement"
            :rules="required"
            :items="severities"
          />
          <auto-complete
            v-model="code"
            :rules="required"
            :items="conditionCodes"
            label="Stage"
          /> -->
        </div>

        <div class="flex items-center justify-between mt-3 mb-5">
          <h3 class="text-sm">Allergies</h3>
          <dots-horizontal-icon class="mr-7" />
        </div>

        <div class="flex items-center justify-between mt-3 mb-5">
          <div class="grid grid-cols-2 gap-2">
            <div class="grid grid-cols-2 gap-2">
              <p class="text-xs text-black font-bold">1. Asthma</p>
            </div>
            <p class="text-xs text-gray-400">
              Undergoing treatment for 5 years now
            </p>
          </div>
          <div class="mr-3 mr-3">
            <img
              src="https://img.icons8.com/fluency-systems-regular/14/000000/menu-2--v1.png"
            />
            <img
              src="https://img.icons8.com/fluency-systems-regular/14/000000/menu-2--v1.png"
              style="margin-top: -4px"
            />
            <img
              src="https://img.icons8.com/fluency-systems-regular/14/000000/menu-2--v1.png"
              style="margin-top: -4px"
            />
          </div>

          <div class="grid grid-cols-2 gap-2">
            <p class="text-xs text-black font-bold">1. Peanut</p>
            <p class="text-xs text-gray-400">
              Undergoing treatment for 5 years now
            </p>
          </div>
        </div>

        <div class="flex items-center justify-between mt-5">
          <h3 class="text-sm">Medications</h3>
          <dots-horizontal-icon class="mr-7" />
        </div>

        <div class="flex items-center justify-between mt-3">
          <div class="flex">
            <div class="">
              <p class="text-xs text-black font-bold">Amlidipine 50mg</p>
              <p class="text-xs text-gray-400">2 x 3 Daily</p>
            </div>
          </div>
          <div class="flex">
            <div class="mr-2">
              <img
                src="https://img.icons8.com/fluency-systems-regular/14/000000/menu-2--v1.png"
              />
              <img
                src="https://img.icons8.com/fluency-systems-regular/14/000000/menu-2--v1.png"
                style="margin-top: -4px"
              />
              <img
                src="https://img.icons8.com/fluency-systems-regular/14/000000/menu-2--v1.png"
                style="margin-top: -4px"
              />
            </div>
            <div class="">
              <p class="text-xs text-black font-bold">Quinine 50mg</p>
              <p class="text-xs text-gray-400">2 x 3 Daily</p>
            </div>
          </div>

          <div class="flex">
            <div class="mr-2">
              <img
                src="https://img.icons8.com/fluency-systems-regular/14/000000/menu-2--v1.png"
              />
              <img
                src="https://img.icons8.com/fluency-systems-regular/14/000000/menu-2--v1.png"
                style="margin-top: -4px"
              />
              <img
                src="https://img.icons8.com/fluency-systems-regular/14/000000/menu-2--v1.png"
                style="margin-top: -4px"
              />
            </div>
            <div class="">
              <p class="text-xs text-black font-bold">Paracetamol 50mg</p>
              <p class="text-xs text-gray-400">2 x 3 Daily</p>
            </div>
          </div>

          <!-- <div class="flex items-center justify-between mt-3">
              2.
              <h3 class="mr-5 ml-1">Peanut</h3>
              <p class="text-sm">Undergoing treatment for 5 years now</p>
            </div> -->
        </div>
      </accordion-component>

      <accordion-component
        class="shadow-none rounded-none border-none text-primary mt-5 mb-5"
        title="Objective"
      >
        <!-- <vue-range-slider v-model="value"></vue-range-slider> -->
        <!-- <CustomRangeSlider/> -->

        <Range />

        <div class="grid grid-cols-2 gap-3 mt-3">
          <div class="relative z-10 mt-5">
            <div class="relative z-10">
              <!-- <check-icon class="icon-check-mark bg-white rounded-full" v-if=" width == 66.66 || width == 99.99"/>
                </div>
                <div class="relative z-10">
                    <check-icon class="icon-check-mark2 bg-white rounded-full" v-if="width == 99.99"/>
                </div>
                <div class="relative z-10">
                    <check-icon class="icon-check-mark3 bg-white rounded-full" v-if="width == 99.99"/> -->
            </div>

            <check-icon
              class="icon-check-mark bg-white rounded-full"
              style="width: 66.66"
            />

            <div
              class="grid grid-cols-3 gap-40 w-full justify-content-between content-center"
            >
              <p
                class="text-xs text-black mb-2 font-bold"
                :class="{ 'text-gray-900': width == 33.33 }"
              >
                Pain Scale
              </p>
            </div>

            <vue-slider v-model="value"></vue-slider>

            <!--

<input id="rangeInput" type="range" list="tickmarks" min="0" max="100">

<datalist id="tickmarks">
  <option value="0" label="0%"></option>
  <option value="10"></option>
  <option value="20"></option>
  <option value="30"></option>
  <option value="40"></option>
  <option value="50" label="50%"></option>
  <option value="60"></option>
  <option value="70"></option>
  <option value="80"></option>
  <option value="90"></option>
  <option value="100" label="100%"></option>
</datalist> -->

            <!-- most basic, used for Knobs demo
<div class="range-slider" style='--min:0; --max:100; --step:5; --value:75; --text-value:"75";'>
  <input type="range" min="0" max="100" step="5" value="75" oninput="this.parentNode.style.setProperty('--value',this.value); this.parentNode.style.setProperty('--text-value', JSON.stringify(this.value))">
  <output></output>
  <div class='range-slider__progress'></div>
</div> -->

            <!-- <form>
  <div>
    <input id="rangeInput2" type="range" min="0" max="200" oninput="amount.value=rangeInput.value" />
    <input id="amount" type="number" value="100" min="0" max="200" oninput="rangeInput.value=amount.value" />
  </div>
</form>



<input id="rangeInput" type="range" list="tickmarks" min="0" max="100" oninput="amount.value=rangeInput.value">

<datalist id="tickmarks">
  <option value="0" label="0%"></option>
  <option value="10"></option>
  <option value="20"></option>
  <option value="30"></option>
  <option value="40"></option>
  <option value="50" label="50%"></option>
  <option value="60"></option>
  <option value="70"></option>
  <option value="80"></option>
  <option value="90"></option>
  <option value="100" label="100%"></option>
</datalist> -->

            <div class="relative pt-1 mt-5">
              <div
                class="overflow-hidden h-1 mb-4 text-xs flex rounded bg-gray-200 cursor-pointer"
              >
                <!-- <div  :style="{width: `${width}%`}" aria-valuenow="25" aria-valuemin="0"  aria-valuemax="100" class="progress cursor-pointer shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-danger"> -->
                <div
                  style="width: 20%"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  class="progress cursor-pointer shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-danger"
                >
                  <div class="icon-wrap"></div>
                </div>
              </div>
              <div>
                <div class="flex items-center justify-between">
                  <p class="text-xs font-semibold">0</p>
                  <p class="text-xs font-semibold">100</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <timeable-picker v-model="onsetTimeable" /> -->
        <!-- <timeable-picker2 v-model="onsetTimeable" /> -->
        <!-- <cornie-radio class="icon-check-mark3 bg-white rounded-full" :label="ggg"
    :modelValue="true" v-model="generalNormal" /> -->
        <h3 class="text-sm font-bold">General WNL</h3>
        <ul class="flex">
          <li
            class="list-none items-center flex text-xs font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer my-1 -m-2 p-5 py-2"
          >
            <div class="flex item-center">
              <cornie-radio
                class="col-span-2"
                v-model="generalNormal"
                name="patient"
                id="group"
              />
              Normal
            </div>
          </li>
          <li
            class="list-none items-center flex text-xs font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer my-1 -m-2 p-5 py-2"
          >
            <div class="flex item-center">
              <cornie-radio
                class="col-span-2"
                v-model="generalAbnormal"
                name="patient"
                id="group"
              />
              Abnormal
            </div>
          </li>
        </ul>
        <cornie-text-area
          rows="4"
          v-model="generalNote"
          label="Notes"
          class="w-full"
        />

        <h3 class="text-sm font-bold">HEENT WNL</h3>
        <ul class="flex">
          <li
            class="list-none items-center flex text-xs font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer my-1 -m-2 p-5 py-2"
          >
            <div class="flex item-center">
              <cornie-radio
                class="col-span-2"
                v-model="heentNormal"
                name="patient"
                id="group"
              />
              Normal
            </div>
          </li>
          <li
            class="list-none items-center flex text-xs font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer my-1 -m-2 p-5 py-2"
          >
            <div class="flex item-center">
              <cornie-radio
                class="col-span-2"
                v-model="heentAbnormal"
                name="patient"
                id="group"
              />
              Abnormal
            </div>
          </li>
        </ul>
        <cornie-text-area
          rows="4"
          v-model="heentNote"
          label="Notess"
          class="w-full"
        />

        <h3 class="text-sm font-bold">Skin WNL</h3>
        <ul class="flex">
          <li
            class="list-none items-center flex text-xs font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer my-1 -m-2 p-5 py-2"
          >
            <div class="flex item-center">
              <cornie-radio
                class="col-span-2"
                v-model="skinNormal"
                name="patient"
                id="group"
              />
              Normal
            </div>
          </li>
          <li
            class="list-none items-center flex text-xs font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer my-1 -m-2 p-5 py-2"
          >
            <div class="flex item-center">
              <cornie-radio
                class="col-span-2"
                v-model="skinAbnormal"
                name="patient"
                id="group"
              />
              Abnormal
            </div>
          </li>
        </ul>
        <cornie-text-area
          rows="4"
          v-model="skinNote"
          label="Notess"
          class="w-full"
        />

        <h3 class="text-sm font-bold">Neck WNL</h3>
        <ul class="flex">
          <li
            class="list-none items-center flex text-xs font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer my-1 -m-2 p-5 py-2"
          >
            <div class="flex item-center">
              <cornie-radio
                class="col-span-2"
                v-model="neckNormal"
                name="patient"
                id="group"
              />
              Normal
            </div>
          </li>
          <li
            class="list-none items-center flex text-xs font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer my-1 -m-2 p-5 py-2"
          >
            <div class="flex item-center">
              <cornie-radio
                class="col-span-2"
                v-model="neckAbnormal"
                name="patient"
                id="group"
              />
              Abnormal
            </div>
          </li>
        </ul>
        <cornie-text-area
          rows="4"
          v-model="stageNote"
          label="Notess"
          class="w-full"
        />

        <h3 class="text-sm">Extremities</h3>
        <ul class="flex">
          <li
            class="list-none items-center flex text-xs font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer my-1 -m-2 p-5 py-2"
          >
            <div class="flex item-center">
              <cornie-radio
                class="col-span-2"
                v-model="exteremitiesNormal"
                name="patient"
                id="group"
              />
              Normal
            </div>
          </li>
          <li
            class="list-none items-center flex text-xs font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer my-1 -m-2 p-5 py-2"
          >
            <div class="flex item-center">
              <cornie-radio
                class="col-span-2"
                v-model="extremetiesAbnormal"
                name="patient"
                id="group"
              />
              Abnormal
            </div>
          </li>
        </ul>
        <cornie-text-area
          rows="4"
          v-model="extremetiesNote"
          label="Notess"
          class="w-full"
        />
        <!-- <measurable v-model="onsetMeasurable" /> -->

        <!-- <cornie-input v-model="diagnotisResult" label="Diagnostics Result" /> -->
        <div class="relative text-gray-700">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="Diagnostics-Result"
          >
            Diagnostics Result
          </label>
          <input
            class="w-full h-10 pl-3 pr-8 text-base focus:outline-none placeholder-gray-600 border rounded-lg focus:shadow-outline"
            id="Diagnostics-Result"
            type="text"
            placeholder="Regular input"
          />
          <div
            class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"
          >
            <add-icon class="mt-8" style="color: red" />
          </div>
        </div>
        <div></div>
      </accordion-component>

      <accordion-component
        class="shadow-none rounded-none border-none text-primary mt-5 mb-5"
        title="Assessment"
        :opened="false"
      >
        <cornie-text-area
          rows="4"
          v-model="stageNote"
          label="Notes"
          class="w-full"
        />
      </accordion-component>

      <accordion-component
        class="shadow-none rounded-none border-none text-primary mt-5 mb-5"
        title="Plan"
        :opened="false"
      >
        <add-icon />

        <div class="grid grid-cols-2 gap-3 mt-3">
          <cornie-input
            v-model="stageChiefComplaint"
            label="Diagnostic Request"
          />
          <cornie-input
            v-model="stageChiefComplaint"
            label="Medication Request"
          />
          <cornie-input
            v-model="stageChiefComplaint"
            label="Referral Request"
          />

          <cornie-input
            v-model="stageChiefComplaint"
            label="Hospitalizations"
          />

          <!-- <cornie-select
            v-model="status"
            label="Diagnostic Request"
            :items="clinicalStatuses"
            :rules="required"
          />
          <cornie-select
            v-model="severity"
            label="Medication Request"
            :items="verificationStatuses"
            :rules="required"
          />
          <auto-complete
            v-model="category"
            :rules="required"
            :items="categories"
            label="Referral Request"
          />
          <cornie-select
            v-model="severity"
            label="Hospitalizations"
            :rules="required"
            :items="severities"
          /> -->
        </div>
        <cornie-text-area
          rows="4"
          v-model="stageNote"
          label="Notes"
          class="w-full"
        />
      </accordion-component>
    </v-form>
    <template #actions>
      <cornie-btn
        @click="show = false"
        class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
      >
        Cancel
      </cornie-btn>
      <cornie-btn @click="submit" class="text-white bg-danger px-6 rounded-xl">
        Create
      </cornie-btn>
    </template>
  </clinical-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import ClinicalDialog from "./clinical-dialog.vue";
import AccordionComponent from "@/components/dialog-accordion.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CornieInput from "@/components/cornieinput.vue";
import DateTimePicker from "./date-time-picker.vue";

import CornieTextArea from "@/components/textarea.vue";
import EncounterSelect from "./encounter-select.vue";
import AssessmentSelect from "./assessment-select.vue";
import PractitionerSelect from "./practitioner-select.vue";
import AutoComplete from "@/components/autocomplete.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import TimeablePicker from "./timeable.vue";
import TimeablePicker2 from "./timeable2.vue";
import Measurable from "./measurable.vue";

import CornieRadio from "@/components/cornieradio.vue";

import {
  verificationStatuses,
  clinicalStatuses,
  categories,
  severities,
  codes,
  bodySites,
  stages,
  evidenceCodes,
} from "./drop-downs";

import { namespace } from "vuex-class";
import IPractitioner from "@/types/IPractitioner";
import { string } from "yup";
import { cornieClient } from "@/plugins/http";

import DotsHorizontalIcon from "@/components/icons/DotsHorizontalIcon.vue";
import DotsVerticalIcon from "@/components/icons/DotsVerticalIcon.vue";
import DateTimePicker2 from "./date-time-picker.vue";
import AddIcon from "@/components/icons/add.vue";
import Range from "@/components/range.vue";

// import "vue-range-component/dist/vue-range-slider.js";
// import * as VueRangeSlider from "vue-range-component";
// import { VueRangeSlider} from 'vue-range-component'
// const VueRangeSlider = require('vue-range-component');
// const VueRangeSlider = require('vue-range-component');

// import '@yaireo/ui-range'

// import VueSlider from 'vue-slider-component'
// import 'vue-slider-component/theme/default.css'

//  import CustomRangeSlider from "./CustomRangeSlider.vue";

const user = namespace("user");

const timeable = {
  age: "",
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  date: "",
  time: "",
};

const measurable = {
  unit: "",
  min: "",
  max: "",
  string: "",
};

@Options({
  name: "AddProgressNote",
  components: {
    ClinicalDialog,
    CornieBtn,
    Measurable,
    TimeablePicker,
    AutoComplete,
    EncounterSelect,
    AssessmentSelect,
    PractitionerSelect,
    AccordionComponent,
    CornieSelect,
    CornieInput,
    CornieTextArea,
    DateTimePicker,

    DotsHorizontalIcon,
    DotsVerticalIcon,
    TimeablePicker2,
    AddIcon,

    Range,

    CornieRadio,

    // CustomRangeSlider

    // VueSlider
  },
})
export default class AddCondition extends Vue {
  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  @PropSync("modelValue")
  show!: boolean;

  @user.Getter
  authPractitioner!: IPractitioner;

  required = string().required();

  clinicalStatuses = clinicalStatuses;
  verificationStatuses = verificationStatuses;
  severities = severities;
  categories: any = [];
  conditionCodes = codes;
  bodySites = bodySites;
  stages = stages;
  evidenceCodes = evidenceCodes;

  clinicalStatus = "";
  verificationStatus = "";
  category = "";
  severity = "";
  code = "";
  bodySite = "";
  referenceEncounter = "";

  asserter = "";

  onsetTimeable = { ...timeable };
  onsetMeasurable = { ...measurable };

  abatementTimeable = { ...timeable };
  abatementMeasurable = { ...measurable };

  stageSummary = "";
  stageType = "";
  stageAssessment = "";
  stageNote = "";

  evidenceCode = "";
  evidenceDetail = "";
  evidenceNote = "";

  generalNormal = "";
  generalAbnormal = "";
  generalNote = "";
  heentNormal = "";
  heentAbnormal = "";
  heentNote = "";
  skinNormal = "";
  skinAbnormal = "";
  skinNote = "";
  extremetiesNormal = "";
  extremetiesAbnormal = "";
  extremetiesNote = "";

  async loadDropdown() {
    this.categories = await categories();
  }

  @Watch("authPractitioner")
  practitionerChanged() {
    this.setAsserter();
  }

  async setAsserter() {
    this.asserter = this.authPractitioner?.id || "";
  }

  get patientId() {
    return this.$route.params.id;
  }

  get onset() {
    return {};
  }

  get width() {
    return "66.66";
  }

  get abatement() {
    return {
      asserter: this.asserter,
    };
  }

  buildPeriod(
    startDate: string,
    startTime: string,
    endDate: string,
    endTime: string
  ) {
    const start = this.buildDateTime(startDate, startTime);
    const end = this.buildDateTime(endDate, endTime);
    return { start, end };
  }
  buildDateTime(dateString: string, time: string) {
    const date = new Date(dateString);
    const [hour, minute] = time.split(":");
    date.setMinutes(Number(minute));
    date.setHours(Number(hour));
    return date.toISOString();
  }
  // get payload() {
  //   return {
  //     patientId: this.patientId,
  //     encounterId: this.referenceEncounter,
  //     clinicalStatus: this.clinicalStatus,
  //     verificationStatus: this.verificationStatus,
  //     type: this.stageType,
  //     category: this.category,
  //     summary: this.stageSummary,
  //     detail: this.evidenceDetail,
  //     notes: this.stageNote,
  //     bodySite: this.bodySite,
  //     subject: "patient",
  //     assesment: "",
  //     severity: this.severity,
  //     evidenceNote: this.evidenceNote,
  //     onset: this.onset,
  //     abatement: this.abatement,
  //   };
  // }

  get payload2() {
    return {
      patientId: this.patientId,
      encounterId: this.referenceEncounter,
      clinicalStatus: this.clinicalStatus,
      verificationStatus: this.verificationStatus,
      generalNormal: this.generalNormal,
      generalAbnormal: this.generalAbnormal,
      generalNote: this.generalNote,
      heentNormal: this.heentNormal,
      heentAbnormal: this.heentAbnormal,
      heentNote: this.heentNote,
      skinNormal: this.skinNormal,
      skinAbnormal: this.skinAbnormal,
      skinNote: this.skinNote,
      extremetiesNormal: this.extremetiesNormal,
      extremetiesAbnormal: this.extremetiesAbnormal,
      extremetiesNote: this.extremetiesNote,
      // type: this.stageType,
      // category: this.category,
      // summary: this.stageSummary,
      // detail: this.evidenceDetail,
      // notes: this.stageNote,
      // bodySite: this.bodySite,
      // subject: "patient",
      // assesment: "",
      // severity: this.severity,
      // evidenceNote: this.evidenceNote,
      onset: this.onset,
      abatement: this.abatement,
    };
  }

  // async submit() {
  //   const { valid } = await (this.$refs.form as any).validate();
  //   if (!valid) return;
  //   try {
  //     const { data } = await cornieClient().post(
  //       "/api/v1/condition",
  //       this.payload
  //     );
  //     window.notify({ msg: "Condition created", status: "success" });
  //   } catch (error) {
  //     window.notify({ msg: "Condition not created", status: "error" });
  //   }
  // }

  async submit() {
    ;
    const { valid } = await (this.$refs.form as any).validate();
    if (!valid) {
      return ;
    }
    try {
      const { data } = await cornieClient().post(
        "/api/v1/progress-notes",
        this.payload2
      );
      window.notify({ msg: "Progress notes Created", status: "success" });
      ;
    } catch (error) {
      window.notify({ msg: "Progress note not created", status: "error" });
      ;
    }
  }

  created() {
    this.loadDropdown();
    this.setAsserter();
  }
}
</script>

<style scoped></style>
