<template>
  <clinical-dialog
    v-model="show"
    title="New Progress Note"
    subtext="All Fields are required"
    class=""
  >
    <dots-horizontal-icon class="mr-7" @click="isShow" />
    <div
      v-if="topClick"
      class="p-2 flex flex-row-reverse"
      style="margin-top: -30px"
    >
      <!-- <div class="card">
        <div class="p-2 m-1">
          <div class="p-3 flex justify-between p-1">
            <add-icon class="" />
            <p class="text-xs">Reference Encounter</p>
          </div>
          <div class="p-3 flex justify-between p-1">
            <add-icon class="" style="color: red" />
            <p class="text-xs">Clinical Impression</p>
          </div>
        </div>
      </div> -->
    </div>

    <!-- <add-progres-note @click="addingProgressnote = true"  /> -->

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
          <dots-horizontal-icon class="mr-7" @click="isShow" />
        </div>

        <div class="grid grid-cols-2 text-center gap-3 mt-5">
          <!-- <cornie-input v-model="complaint" label="Chief Complaint" />
          <condition-select
            :rules="required"
            v-model="MyConditions"
            label="Chief Complaint"
            :conditions="conditions"
          /> -->

          <auto-complete
            v-bind="$attrs"
            v-model="item"
            :filter="filter"
            :items="items"
          >
            <template #item="{ item }">
              <div
                @click="printId(item)"
                class="w-full flex items-center my-1 justify-between"
              >
                <div class="flex items-center">
                  <!-- <avatar :src="item.image" /> -->
                  <div class="flex ml-1 flex-col">
                    <span class="text-xs">{{ item.severity }}</span>
                  </div>
                </div>
                <span class="text-xs font-semibold text-gray-500">
                  {{ item.recorder.name }}
                </span>
              </div>
            </template>
          </auto-complete>
          <div
            class="
              absolute
              inset-y-0
              right-0
              flex
              items-center
              px-2
              pointer-events-none
            "
          >
            <!-- <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
                clip-rule="evenodd"
                fill-rule="evenodd"
              ></path>
            </svg> -->
          </div>
        </div>

        <div class="relative text-gray-700">
          <!-- <input
            class="
              w-full
              h-10
              pl-3
              pr-8
              text-base
              focus:outline-none
              placeholder-gray-600
              border
              rounded-lg
              focus:shadow-outline
            "
            type="text"
            placeholder="Regular input"
          /> -->
          <div
            class="
              absolute
              inset-y-0
              right-0
              flex
              items-center
              px-2
              pointer-events-none
            "
          >
            <!-- <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
                clip-rule="evenodd"
                fill-rule="evenodd"
              ></path>
            </svg> -->
          </div>
        </div>

        <div class="flex items-center justify-between mt-3 mb-2">
          <h3 class="text-sm">History of Present Sickness (HPI)</h3>
          <dots-horizontal-icon class="mr-7" />
        </div>

        <div class="grid grid-cols-2 gap-3 mt-5">
          <cornie-input v-model="myItem.id" label="Statuses" />
          <cornie-input v-model="myItem.severity" label="Severity" />
          <cornie-input v-model="myItem.onset" label="Onset" />
          <cornie-input v-model="myItem.abatement" label="Abatement" />

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
        <div class="flex items-center justify-between mt-3 mb-5"  v-for="(item,index) in patientAllergy" :key="index">
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

        <!-- <Range /> -->

        <!-- <div class="range-slider">
    <input type="range" min="0" max="180" step="1" v-model="sliderMax"  class="mr-10"/>
    <input
      type="number"
      min="0"
      max="180"
      step="1"
      v-model="sliderMax"
      class="maxnumber"
    />
    </div> -->

        <div class="grid grid-cols-2 gap-3 mt-3">
          <div class="relative z-10 mt-5">
            <vue-slider v-model="value"></vue-slider>

          </div>
        </div>
        <!-- <cornie-radio
          class="icon-check-mark3 bg-white rounded-full"
          label="ggg"
          modelValue="true"
          v-model="generalNormal"
        /> -->
        <h3 class="text-sm font-bold">General WNL</h3>
        <ul class="flex">
          <li
            class="
              list-none
              items-center
              flex
              text-xs
              font-semibold
              text-gray-700
              hover:bg-gray-100 hover:text-gray-900
              cursor-pointer
              my-1
              -m-2
              p-5
              py-2
            "
          >
            <div class="flex item-center">
              <cornie-radio
                class="col-span-2"
                name="generalNormal"
                id="group"
                label="ffff"
                modelValue="generals.value"
              />
            </div>
          </li>
          <li
            class="
              list-none
              items-center
              flex
              text-xs
              font-semibold
              text-gray-700
              hover:bg-gray-100 hover:text-gray-900
              cursor-pointer
              my-1
              -m-2
              p-5
              py-2
            "
          >
            <div class="flex item-center">
              <cornie-radio
                class="col-span-2"
                v-model="generals.value"
                name="generalNormal"
                id="group"
                value="abnormal"
              />
              Abnormal
            </div>
          </li>
        </ul>
        <cornie-text-area
          rows="4"
          v-model="generals.note"
          label="Notes"
          class="w-full"
        />

        <h3 class="text-sm font-bold">HEENT WNL</h3>
        <ul class="flex">
          <li
            class="
              list-none
              items-center
              flex
              text-xs
              font-semibold
              text-gray-700
              hover:bg-gray-100 hover:text-gray-900
              cursor-pointer
              my-1
              -m-2
              p-5
              py-2
            "
          >
            <div class="flex item-center">
              <cornie-radio
                class="col-span-2"
                v-model="heent.value"
                name="heentNormal"
                id="group"
                value="normal"
              />
              Normal
            </div>
          </li>
          <li
            class="
              list-none
              items-center
              flex
              text-xs
              font-semibold
              text-gray-700
              hover:bg-gray-100 hover:text-gray-900
              cursor-pointer
              my-1
              -m-2
              p-5
              py-2
            "
          >
            <div class="flex item-center">
              <cornie-radio
                class="col-span-2"
                v-model="heent.value"
                name="heentNormal"
                id="group"
                value="abnormal"
              />
              Abnormal
            </div>
          </li>
        </ul>
        <cornie-text-area
          rows="4"
          v-model="heent.note"
          label="Notes"
          class="w-full"
        />

        <h3 class="text-sm font-bold">Skin WNL</h3>
        <ul class="flex">
          <li
            class="
              list-none
              items-center
              flex
              text-xs
              font-semibold
              text-gray-700
              hover:bg-gray-100 hover:text-gray-900
              cursor-pointer
              my-1
              -m-2
              p-5
              py-2
            "
          >
            <div class="flex item-center">
              <cornie-radio
                class="col-span-2"
                v-model="skin.value"
                name="skinNormal"
                id="group"
                value="normal"
              />
              Normal
            </div>
          </li>
          <li
            class="
              list-none
              items-center
              flex
              text-xs
              font-semibold
              text-gray-700
              hover:bg-gray-100 hover:text-gray-900
              cursor-pointer
              my-1
              -m-2
              p-5
              py-2
            "
          >
            <div class="flex item-center">
              <cornie-radio
                class="col-span-2"
                v-model="skin.value"
                name="skinNormal"
                id="group"
                value="abnormal"
              />
              Abnormal
            </div>
          </li>
        </ul>
        <cornie-text-area
          rows="4"
          v-model="skin.note"
          label="Notes"
          class="w-full"
        />

        <h3 class="text-sm font-bold">Neck WNL</h3>
        <ul class="flex">
          <li
            class="
              list-none
              items-center
              flex
              text-xs
              font-semibold
              text-gray-700
              hover:bg-gray-100 hover:text-gray-900
              cursor-pointer
              my-1
              -m-2
              p-5
              py-2
            "
          >
            <div class="flex item-center">
              <cornie-radio
                class="col-span-2"
                v-model="neck.value"
                name="neckNormal"
                id="group"
                value="normal"
              />
              Normal
            </div>
          </li>
          <li
            class="
              list-none
              items-center
              flex
              text-xs
              font-semibold
              text-gray-700
              hover:bg-gray-100 hover:text-gray-900
              cursor-pointer
              my-1
              -m-2
              p-5
              py-2
            "
          >
            <div class="flex item-center">
              <cornie-radio
                class="col-span-2"
                v-model="neck.value"
                name="neckNormal"
                id="group"
                value="abnormal"
              />
              Abnormal
            </div>
          </li>
        </ul>
        <cornie-text-area
          rows="4"
          v-model="neck.note"
          label="Notes"
          class="w-full"
        />

        <h3 class="text-sm">Extremities</h3>
        <ul class="flex">
          <li
            class="
              list-none
              items-center
              flex
              text-xs
              font-semibold
              text-gray-700
              hover:bg-gray-100 hover:text-gray-900
              cursor-pointer
              my-1
              -m-2
              p-5
              py-2
            "
          >
            <div class="flex item-center">
              <cornie-radio
                class="col-span-2"
                v-model="extremities.value"
                name="extremitiesNormal"
                id="group"
                value="normal"
              />
              Normal
            </div>
          </li>
          <li
            class="
              list-none
              items-center
              flex
              text-xs
              font-semibold
              text-gray-700
              hover:bg-gray-100 hover:text-gray-900
              cursor-pointer
              my-1
              -m-2
              p-5
              py-2
            "
          >
            <div class="flex item-center">
              <cornie-radio
                class="col-span-2"
                v-model="extremities.value"
                name="extremitiesAbnormal"
                id="group"
                value="abnormal"
              />
              Abnormal
            </div>
          </li>
        </ul>
        <cornie-text-area
          rows="4"
          v-model="extremities.note"
          label="Notes"
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
            class="
              w-full
              h-10
              pl-3
              pr-8
              text-base
              focus:outline-none
              placeholder-gray-600
              border
              rounded-lg
              focus:shadow-outline
            "
            id="Diagnostics-Result"
            type="text"
            placeholder="Regular input"
          />
          <div
            class="
              absolute
              inset-y-0
              right-0
              flex
              items-center
              px-2
              pointer-events-none
            "
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
        <div class="p-2 flex flex-row-reverse">
          <!-- <div class="p-3 flex justify-between p-1">
            <add-icon class="p-1" />
            <p class="text-xs">Clinical Impression</p>
          </div> -->
          <!-- <assessment-select
            :patientId="patientId"
            v-model="stageAssessment"
            label=""
          />
           <referrer-select
            :patientId="patientId"
            v-model="stageAssessment"
            label="dsdsds"
          /> -->
        </div>
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
        <!-- <add-icon /> -->
        <div class="grid grid-cols-2 gap-3 mt-3">
          <!-- <cornie-input
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
          /> -->

          <encounter-select
            v-model="referenceEncounter"
            :rules="required"
            label="Reference Encounter"
            @click="printEncounterId(referenceEncounter)"
          />

           <referrer-select
            v-model="referenceEncounter2"
            label="Referral Request"
            @click="printEncounterId(referenceEncounter2)"
          />




           <!-- <auto-complete :items="items2" v-model="encounter">
    <template #item="{ item }">
      <div class="flex justify-between my-1 items-center text-xs">
        <span class="flex flex-col">
          YXXX-XXX-XXX
          <span class="flex items-center">
            <avatar :src="item.practitionerImage" class="mr-1" />
            {{ item.practitioner }}
          </span>
        </span>
        <span class="flex flex-col">
          <span class="font-semibold text-sm mb-1 text-black">
            {{ item.type }}
          </span>
          <span class="text-gray-500">{{ item.time }}</span>
        </span>
      </div>
    </template>
  </auto-complete> -->
          <!-- <auto-complete
            v-bind="$attrs"
            v-model="item"
            :filter="filter"
            :items="itemsencounter"
          >
            <template #item="{ item }">
              <div
                
                class="w-full flex items-center my-1 justify-between"
              >
                <div class="flex items-center">
                  <div class="flex ml-1 flex-col">
                    <span class="text-xs">{{ item.practitioner }}</span>
                  </div>
                </div>
                <span class="text-xs font-semibold text-gray-500">
                  {{ item.practitioner }}
                </span>
              </div>
            </template>
          </auto-complete> -->

          <cornie-select
            v-model="status"
            label="Diagnostic Request"
            :items="clinicalStatuses"
          />
          <cornie-select
            v-model="severity"
            label="Medication Request"
            :items="verificationStatuses"
          />

          <!-- <cornie-select
            v-model="severity"
            label="Medication Request"
            :items="verificationStatuses"
            :rules="required"
          /> -->
          <auto-complete
            v-model="category"
            :items="categories"
            label="Referral Request"
          />
          <cornie-select
            v-model="severity"
            label="Hospitalizations"
            :items="severities"
          />
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
import { Demographics, Guarantor, IPatient } from "@/types/IPatient";
import CornieCard from "@/components/cornie-card";
import AddProgressNote2 from "./add-progressnote.vue";

import ConditionSelect from "./condition-select.vue";

import { ICondition } from "@/types/ICondition";
import IOtherrequest from "@/types/IOtherrequest";
import IRequest from "@/types/IRequest";

const condition = namespace("condition");

import { Codeable } from "@/types/misc";
import { printPractitioner } from "@/plugins/utils";
import Condition from "yup/lib/Condition";
import { IClinicalImpression } from "@/types/ClinicalImpression";
import ReferrerSelect from "./referrer-select.vue";

import  IAllergy  from "@/types/IAllergy";





const userStore = namespace("user");
const patients = namespace("patients");
const visitsStore = namespace("visits");
const practitioner = namespace("practitioner");
const vital = namespace("vitals");
import IEncounter from "@/types/IEncounter";

const request = namespace("request");
const otherrequest = namespace("otherrequest");
const allergy = namespace("allergy");


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


const emptyRequest: IRequest = {
  requestInfo: {},
  requestDetails: {},
  subject: {},
  performer: {},
  medicationAdministration: {},
  fufillment: {},
  history: {},
  Medications: []


};

@Options({
  name: "AddProgressNote",
  components: {
    ...CornieCard,
    ClinicalDialog,
    CornieBtn,
    Measurable,
    TimeablePicker,
    AutoComplete,
    EncounterSelect,
    AssessmentSelect,
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
    ConditionSelect,
    ReferrerSelect

    // CustomRangeSlider

    // VueSlider
  },
})
export default class AddProgressNote extends Vue { 
  @condition.Action
  fetchPatientConditions!: (patientId: string) => Promise<ICondition>;


  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  @PropSync("modelValue")
  show!: boolean;
  @Prop({ type: Object, required: true })
  patient!: IPatient;

  @Prop({ type: String, default: "" })
  patientId!: string;

  @Prop({ type: String, default: "" })
  id!: string;

  @user.Getter
  authPractitioner!: IPractitioner;

  @vital.State
  encounters!: [];

  @vital.Action
  getEncounters!: (patientId: string) => Promise<void>;
  
  @request.State
  requests!: any[];

  @otherrequest.State
  otherrequests!: any[];

  @request.Action
  fetchRequests!: () => Promise<void>;

  // @otherrequest.Action
  // fetchOtherrequests!: () => Promise<void>;

   @otherrequest.Action
  fetchOtherrequestsById!: (patientId: string) => Promise<void>;


  @request.State
  patients!: any[];

  @request.State
  practitioners!: any[];

  @request.Action
  getPatients!: () => Promise<void>;

  @request.Action
  getPractitioners!: () => Promise<void>;

  select(i:number) {
      this.selected = i;
    }

@allergy.Action
  getAllergyById!: (id: string) => IAllergy

  rawClinicalImpressions: IClinicalImpression[] = [];

  patientAllergy: any = [];

  addingProgressnote = false;
  meConditions!: [];

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
  referenceEncounter2 = "";


  asserter = "";
  theCondition = "";

  onsetTimeable = { ...timeable };
  onsetMeasurable = { ...measurable };

  abatementTimeable = { ...timeable };
  abatementMeasurable = { ...measurable };

  stageSummary = "";
  stageType = "";
  stageAssessment: any = {};
  stageNote = "";

  evidenceCode = "";
  evidenceDetail = "";
  evidenceNote = "";
  // item: any = {};

   item = {} as ICondition;

  // patientProgressNotes = [] as IProgressnote[];

  async loadDropdown() {
    this.categories = await categories();
  }

  get painScale() {
    return this.sliderMax;
  }

  get isShow() {
    console.log("gdgdg");
    return (this.topClick = !this.topClick);
  }

  @Watch("authPractitioner")
  practitionerChanged() {
    this.setAsserter();
  }

  
@Watch('id')
  idChanged() {
    this.setAllergy()
  }

  async setAsserter() {
    this.asserter = this.authPractitioner?.id || "";
  }

  async setCondition() {
    this.theCondition = this.authPractitioner?.id || "";
  }

  get MyConditions() {
    return this.fetchPatientConditions(this.patientId);
  }

  // get patientId() {
  //   return this.$route.params.id;
  // }

  @condition.State
  conditions!: { [state: string]: ICondition[] };

  _categories = [] as Codeable[];

   @allergy.Action
  fetchAllergys!: (patientId: string) => Promise<void>;

  get patientConditions() {
    return this.conditions[this.patientId] || [];
  }
  printCategory(category: string) {
    return this._categories.find((cat) => cat.code == category)?.display || "";
  }

  printCode(code: string) {
    return codes.find((c) => c.code == code);
  }

  printRecorded(condition: any) {
    const dateString = condition.createdAt;
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  printSeverity(severity: string) {
    return severities.find((s) => s.code == severity)?.display || "";
  }

  printId(  item = {} as ICondition) {
    console.log("dddd", this.newitem);
    this.myId = item.id;
    this.myItem = this.newitem;
    // // const uuu =  this.items.find((s) => s.id == item.id) || "";
    return this.myItem;
  }
  enc: any = [];
  printEncounterId(id: string) {
    this.enc.push(id);
    console.log("push", this.enc);

const newArr = this.enc.filter(function(entry: any) { return entry.trim() != ''; })
// var filtered = this.enc.filter(function (el: any) {
//   return el != null;
// });

console.log("filtered", newArr);
    return newArr;
  }

    referrers: any = [];

async setAllergy() {
    const allergy = await this.getAllergyById(this.id)
    if (!allergy) return
    this.clinicalStatus = allergy.clinicalStatus
    this.verificationStatus = allergy.verificationStatus
    // this.type = allergy.type
    //  this.category = allergy.category
    // this.criticality = allergy.criticality
    // this.code = allergy.code
    // this.onSet = allergy.onSet
    // this.reaction = allergy.reaction  
  }
  get items() {
    const items = this.patientConditions.map((condition) => ({
      ...condition,
      original: condition,
      identifier: "XXXXX",
      recorded: this.printRecorded(condition),
      category: this.printCategory(condition.category),
      code: this.printCode(condition.code),
      severity: this.printSeverity(condition.severity),
      // clinicalStatus: this.stripQuote(condition.clinicalStatus),
      recorder: {
        name: printPractitioner(condition.practitioner!!),
        department: condition.practitioner!!.department,
      },
    }));
    return items;
  }

   get items2() {
    const items = this.patientConditions.map((condition) => ({
      ...condition,
      original: condition,
      identifier: "XXXXX",
      recorded: this.printRecorded(condition),
      category: this.printCategory(condition.category),
      code: this.printCode(condition.code),
      severity: this.printSeverity(condition.severity),
      // clinicalStatus: this.stripQuote(condition.clinicalStatus),
      recorder: {
        name: printPractitioner(condition.practitioner!!),
        department: condition.practitioner!!.department,
      },
    }));
    return items;
  }

  get theid() {
    const id = this.patientId;
    return id;
  }

  get newitem() {
    const uuitem = this.patientConditions[0];
    return uuitem;
  }

  printEncounterPractioner(encounter: any) {
    if (!encounter?.practitioner) return "N/A";
    return encounter?.practitioner[0].firstname;
    // const current_patient = this.encounters;
    // // const my_primaryPhysician = current_patient[0].practitioner!!
    //   const name = `${current_patient?[0].practitioner!!} ${this.itemsencounter.practitioner.lastName}`;
    //   return name;
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

  get generals() {
    return {
      value: "",
      note: "",
    };
  }

  get heent() {
    return {
      value: "",
      note: "",
    };
  }

  get skin() {
    return {
      value: "",
      note: "",
    };
  }

  get neck() {
    return {
      value: "",
      note: "",
    };
  }

  get extremities() {
    return {
      value: "",
      note: "",
    };
  }
  myItem: any = {};
  myId: any = "";
  sliderMax = "";
  topClick = false;
  showColumnFilter = false;
  showMedicationModal= false;
  showEditMedicationModal= false;
  // show = false;
   selected = 1;
requestId = "";
showPartcipants = false;
  query = "";
  search = "";

  selectedStatus = 0;
  filterByStatus: any = [ ]
  completeStatus: any = [  ]
  currentVisitId = '';
  onePatientId= "";
  showNotes = false;
  taskId="";
  activeTab = 0;
  showOthersNotes=false;
  selectType = false;
  filterStatus = false;
  showStatusModal=false;
  showOtherStatusModal=false;
  viewDetails = false;
requestnotes=[];
otherrequestnotes=[];
  selectedSchedule: any = { };
singleParticipant = [];
  selectedVisit : any = { };
  selectedPatient : any = { };
  months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'Auust', 'September', 'October', 'November', 'December' ]
updatedBy= "";
currentStatus="";
update="";
otherupdatedBy = "";
othercurrentStatus = "";
otherupdate="";
 request: IRequest = emptyRequest;

    get itemsrequest() {
    if (!this.requests || this.requests.length === 0 ) return [];
    const filtered = this.requests.filter((i: any) => {
        if (this.filterByStatus.length === 0) {
            return i;
      } else {
          if (this.filterByStatus.includes('Show All')) return true;
        const indexInStatuses = this.filterByStatus.findIndex((j: any) => j.toLowerCase() === i.status.toLowerCase());
        if (indexInStatuses >= 0) return true;
      }
    })

    const requests = filtered.map((i: any) => {
      if (i.status === "cancelled" || i.status === "no-show") {
        i.completeStatus = "Completed";
      } else if (i.status === "On-Hold") {
        i.completeStatus = "On-Hold";
      } else {
        i.completeStatus = "Stopped";
      }
         (i as any).createdAt = new Date(
         (i as any).createdAt 
       ).toDateString();

  (i as any).updatedAt = new Date(
         (i as any).updatedAt
       ).toDateString();
        this.onePatientId =  i.subject.subject;
        this.updatedBy = this.getPatientName(i.requestDetails.requester);
      this.currentStatus = i.status;
      this.update= i.updatedAt
      return {
        ...i,
        action: i.id,
        patientsubject: this.getPatientName(i.subject.subject),
        patientrequester: this.getPatientName(i.requestDetails.requester),
        practitionerdispenser: this.getPractitionerName(i.performer.dispenser),
        practitionerperformer: this.getPractitionerName(i.medicationAdministration.performer),
        status: i.status,
        // slot: `${i.startTime ? i.startTime : ''} ${i.endTime ? i.endTime : ''}`,
      };
    });
    if (this.selectedStatus === 1) return requests.filter((i: any) => i.completeStatus === "On-Hold");
    if (this.selectedStatus === 2) return requests.filter((i) => i.status === "Stopped");
    if (this.selectedStatus === 3) return requests.filter((i) => i.status !== "Stopped" && i.status !== "On-Hold");

    return requests;
  }

   getPatientName(id: string) {
    const pt = this.patients.find((i: any) => i.id === id);
    return pt ? `${pt.firstname} ${pt.lastname}` : '';
  }
getPractitionerName(id: string){
   const pt = this.practitioners.find((i: any) => i.id === id);
    return pt ? `${pt.firstName} ${pt.lastName}` : '';
}
  setSelectedPatient(id: string) {
    const pt = this.patients.find((i: any) => i.id === id);
    this.selectedPatient = pt ? pt : { };
  }

  

  getRequest(id: string) {
    const pt = this.requests.find((i: any) => i.id === id);
    return pt ? pt : { };
  }

  get selectedPatientData() {
    if (!this.selectedPatient || !this.selectedPatient.id) return { };
    const data = this.selectedPatient;
    return {
      gender: data.gender,
      dob: `${new Date(data.dateOfBirth).getDate()} ${this.months[new Date(data.dateOfBirth).getMonth()]}, ${new Date(data.dateOfBirth).getFullYear()}`,
      mrn: data.mrn
    }
  }

  showPatientDetails(id: string) {
    this.setSelectedPatient(id)
    this.viewDetails = true;
  }

  get payload2() {
    const data: any = {};
    if (this.generals.note && this.generals.value) data.general = this.generals;
    if (this.heent.note && this.heent.value) data.heent = this.heent;
    if (this.skin.note && this.skin.value) data.skin = this.skin;
    if (this.neck.note && this.neck.value) data.neck = this.neck;
    if (this.extremities.note && this.extremities.value) data.extremities = this.extremities;
    if (this.extremities.note && this.extremities.value) data.extremities = this.extremities;

    data.patientId = this.patientId;
    data.conditionId = this.myId;
    data.diagnosticsResults = this.enc.length ? this.enc : [];

    return data;
  }


  async submit() {
    console.log("payload", this.payload2);
    console.log("request", this.requests);
    console.log("conditionId", this.payload2.conditionId);
    console.log("push", this.enc);
    const { valid } = await (this.$refs.form as any).validate();
    if (!valid) {
      return console.log("form is invalid");
    }
    try {
      const { data } = await cornieClient().post(
        "/api/v1/progress-notes",
        this.payload2
      );
      window.notify({ msg: "Progress notes Created", status: "success" });
      console.log("success", this.payload2);
    } catch (error) {
      window.notify({ msg: "Progress note not created", status: "error" });
      console.log("error", error);
    }
  }

    async fetchClinicalImpressions() {
    try {
      const { data } = await cornieClient().get(
        `/api/v1/clinical-impressions/findAllByPatient/${this.patientId}`
      );
      this.rawClinicalImpressions = data;
    } catch (error) {
      window.notify({
        msg: "There was an error when fetching patient's clinical impressions",
        status: "error",
      });
    }
  }
  async fetchReferrer() {
    try {
      const { data } = await cornieClient().get(
        `/other-requests/findByPatientSubject/all/${this.patientId}`
      );
      this.referrers = data || [];
      console.log('refereee', this.referrers);
    } catch (error) {
      window.notify({
        msg: "There was an error fetching referrers for patient",
        status: "error",
      });
    }
  }
  async created() {
    //   if (Object.keys(this.conditions).length < 1)
    //     this.fetchPatientConditions(this.patientId);
    //   this._categories = await categories();
    // }
    // this.NewfemCondition = await this.fetchPatientConditions(this.patientId);
    this.fetchPatientConditions(this.patientId);
    if (this.encounters?.length === 0) await this.getEncounters(this.patientId);
    // this.fetchPatientConditions(this.patientId);
    console.log(this.encounters, "Encounters");
    this.loadDropdown();
    this.setAsserter();

    // if (!this.patients || this.patients.length === 0) await this.getPatients();
    // if (!this.requests || this.requests.length === 0) await this.fetchRequests();
    //  if (!this.otherrequests || this.otherrequests.length === 0) await this.fetchOtherrequests();
          // if (!this.otherrequests || this.otherrequests.length === 0) await this.fetchOtherrequestsById(this.patientId);

     
    // if (!this.requests || this.requests.length === 0) await this.getPatients();
    // window.addEventListener('click', (e: any) => {
    //   if (!e.target.classList.contains('md')) {
    //     this.filterStatus = false;
    //   }
    // })
              this.fetchClinicalImpressions();
    this.fetchReferrer();
        if (!this.fetchAllergys || this.fetchAllergys.length === 0) 
        {
         const patientAllergy = await this.fetchAllergys(this.patientId);
         return this.patientAllergy = patientAllergy;
        }
  }
}
</script>

<style scoped>
</style>
