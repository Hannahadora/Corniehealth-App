<template>
  <clinical-dialog v-model="show" title="View Condition" class="">
    <v-form ref="form">
          <div class="grid grid-cols-3 gap-4 w-full mt-5">
               <div>
                   <p class="text-gray-400 italic text-sm">Condition</p>
                   <span class="text-sm">XXXXXX</span>
               </div>
                <div>
                   <p class="text-gray-400 italic text-sm">Clinical Status</p>
                   <span class="text-sm">XXXXXX</span>
               </div>
                <div>
                   <p class="text-gray-400 italic text-sm">Verification Status</p>
                   <span class="text-sm">XXXXXX</span>
               </div>
                 <div>
                   <p class="text-gray-400 italic text-sm">Asserter</p>
                   <div class="flex space-x-4">
                       <avatar />
                        <div>
                            <span class="mb-0 text-sm">Dr George Smith</span>
                            <p class="text-xs">Cardiology</p>
                        </div>
                   </div>
               </div>

           </div> 
      <div class="border-b-2 pb-5 border-dashed border-gray-200">
        <accordion-component
          title="Basic Info"
          :opened="true"
        >
        <template v-slot:default>
            <div class="grid grid-cols-2 gap-3 mt-3">
              <cornie-input
                v-model="category"
                label="Category"
                placeholder="Autoloaded"
                :disabled="true"
              />
              <cornie-input
                v-model="severity"
                label="Severity"
                 placeholder="Autoloaded"
                :disabled="true"
              />
              <cornie-input
                v-model="code"
                label="Code"
                 placeholder="Autoloaded"
                :disabled="true"
              />
              <cornie-input
                v-model="bodySite"
                label="Body Site"
               placeholder="Autoloaded"
                :disabled="true"
              />
              <!-- <encounter-select
                v-model="referenceEncounter"
                :rules="required"
                label="Reference Encounter"
              /> -->
            </div>
        </template>

        </accordion-component>
      </div>
      <div class="border-b-2 pb-5 border-dashed border-gray-200">
          <accordion-component title="Onset" :opened="false"
          >
          <template v-slot:default>
            <div>
                <onset-picker   :disabled="true" v-model="onsetmesurable" label="Onset" />
            </div>
          </template>
          </accordion-component>
      </div>
      <div class="border-b-2 pb-5 border-dashed border-gray-200">
          <accordion-component
              :opened="false"
            title="Abatement"
          >
          <template v-slot:default>
                <div>
                    <onset-picker    :disabled="true" v-model="abatementMeasurable" label="Onset" />
                </div>
          </template>
          </accordion-component>
      </div>
      <div class="border-b-2 pb-5 border-dashed border-gray-200">
            <accordion-component title="Recorded" :opened="false">
              <template v-slot:default>
                <div class="mt-8 grid grid-cols-2 gap-4 w-full">
                  <div class="">
                    <date-time-picker  :label="'Date/Time'" :disabled="true" />
                  </div>
                  <cornie-input
                    label="Recorder"
                    class="-mt-5 w-full"
                    placeholder="Autoloaded"
                    :disabled="true"
                  >
                    <template #labelicon>
                      <custom-checkbox
                        :label="'Assert this record'"
                        class="w-full"
                      />
                    </template>
                    <template #append-inner>
                      <span class="bg-primary py-2.5 px-3 -mr-2 rounded cursor-pointer" @click="showRecorder = true">
                        <d-edit class="fill-current text-white" />
                      </span>
                    </template>
                  </cornie-input>
                </div>
              </template>
            </accordion-component>
      </div>
      <div class="border-b-2 pb-5 border-dashed border-gray-200">
          <accordion-component
            :opened="false"
            title="Stage"
          >
          <template v-slot:default>
            <div class="grid grid-cols-2 gap-4 mt-5">
              <cornie-input v-model="stageSummary"   :disabled="true" label="Summary" />
              <cornie-input v-model="stageAssessment"   :disabled="true" label="Assessment" />
              <cornie-input v-model="stageType"   :disabled="true" label="Type" />
            </div>
            <div class="border-t-2 border-dashed border-gray-200 pt-5">
              <span class="text-sm text-danger">Assessment</span>
                <div class="grid grid-cols-3 gap-4">
                  <div class="bg-white shadow-md p-1 w-full mt-5 rounded-lg">
                    <div class="flex space-x-4 w-full">
                      <div class="w-full">
                        <p class="font-bold text-sm">
                          Bleaching of Skin
                        </p>
                        <span class="text-gray-400 text-xs font-light">
                            21/07/21
                        </span>
                        <span class="text-black text-xs font-light">
                            Dr. Bola Ola <span class="text-gray-400">. Pathology</span>
                        </span>
                      </div>
                      <div class="float-right flex justify-end w-full">
                        <div class="bg-blue-50 p-3 -m-1 rounded-r-lg">
                          <delete-red
                            class="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
    
            </div>
          </template>
          </accordion-component>
      </div>

     <div class="border-b-2 pb-5 border-dashed border-gray-200">
        <accordion-component
          :opened="false"
          title="Evidence"
        >
        <template v-slot:default>
          <div class="grid grid-cols-2 justify-between gap-3 mt-3">
               <cornie-input v-model="evidenceCode"   :disabled="true" label="Code" />
                <cornie-input v-model="evidenceDetail"   :disabled="true" label="Detail" />
                 <cornie-input v-model="evidenceNote"   :disabled="true" label="Note" />
          
          </div>
        </template>
          <!-- <cornie-text-area
            :rules="required"
            v-model="evidenceNote"
            label="Notes"
            class="w-full"
            rows="4"
          /> -->
        </accordion-component>
     </div>
    </v-form>
    <template #optionactions>
        <div class="flex justify-end">
          <span
            v-if="!id"
            class="text-sm font-bold text-danger float-left flex justify-start w-full cursor-pointer"
          >
            Save as draft
          </span>

          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            class="text-white bg-danger px-6 rounded-xl"
          >
            Save
          </cornie-btn>
        </div>
    </template>
  </clinical-dialog>
  <recorder-modal v-model="showRecorder"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { string } from "yup";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";

import IPractitioner from "@/types/IPractitioner";

import AccordionComponent from "@/components/form-accordion.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieTextArea from "@/components/textarea.vue";
import AutoComplete from "@/components/autocomplete.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import { Codeable, Timeable } from "@/types/misc";
import FhirInput from "@/components/fhir-input.vue";
import CustomCheckbox from "@/components/custom-checkbox.vue";
import DEdit from "@/components/icons/aedit.vue";
import DeleteRed from "@/components/icons/delete-red.vue";

import TimeablePicker from "./timeable.vue";
import Measurable from "./measurable.vue";
import EncounterSelect from "./encounter-select.vue";
import AssessmentSelect from "./assessment-select.vue";
import PractitionerSelect from "./practitioner-select.vue";
import OnsetPicker from "./components/onset.vue";
import ClinicalDialog from "./clinical-dialog.vue";
import DateTimePicker from "./date-time-picker.vue";
import RecorderModal from "./components/recorder.vue";

import { ICondition } from "@/types/ICondition";

const condition = namespace("condition");

// import { Codeable } from "@/types/misc";
import { printPractitioner } from "@/plugins/utils";
import Condition from "yup/lib/Condition";

const user = namespace("user");

const timeable = {
  age: null,
  startDate: null,
  startTime: null,
  endDate: null,
  endTime: null,
  date: null,
  time: null,
};

const measurable = {
  age: null,
  ageUnit: null,
  ageValue: null,
  day: null,
  unit: null,
  min: null,
  minUnit: null,
  minValue: null,
  max: null,
  maxUnit: null,
  maxValue: null,
  string: null,
  startDate: null,
  startTime: null,
  endDate: null,
};
;

@Options({
  name: "AddCondition",
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
    FhirInput,
    OnsetPicker,
    DEdit,
    CustomCheckbox,
    DeleteRed,
    RecorderModal,
  },
})
export default class AddCondition extends Vue {
  @condition.Action
  fetchPatientConditions!: (patientId: string) => Promise<void>;

  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  @PropSync("modelValue")
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @user.Getter
  authPractitioner!: IPractitioner;

  required = string().required();

  loading = false;
  showRecorder = false;
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

  onsetmesurable = { ...measurable };

  stageSummary = "";
  stageType = "";
  stageAssessment = {};
  stageNote = "";

  evidenceCode = "";
  evidenceDetail = "";
  evidenceNote = "";

  @Watch("authPractitioner")
  practitionerChanged(): void {
    this.setAsserter();
  }

  async setAsserter() {
    this.asserter = this.authPractitioner?.id || "";
  }

  get patientId() {
    return this.$route.params.id;
  }

  get onset() {
    const { string, ...onsetRange } = this.onsetMeasurable;
    const dateTime = this.safeBuildDateTime(
      this.onsetTimeable.date as any,
      this.onsetTimeable.time as any
    );
    const period = this.buildPeriod(this.onsetTimeable as any);
    const data: any = {
      age: this.onsetTimeable.age,
      onsetString: this.onsetMeasurable.string,
    };
    if (onsetRange.unit && onsetRange.min && onsetRange.max)
      data.range = onsetRange;
    if (period) data.period = period;
    if (dateTime) data.dateTime = dateTime;
    return data;
  }

  get abatement() {
    const { string, ...range } = this.abatementMeasurable;
    const dateTime = this.safeBuildDateTime(
      this.abatementTimeable.date as any,
      this.abatementTimeable.time as any,
    );
    const period = this.buildPeriod(this.abatementTimeable as any);
    const data: any = {
      range,
      string,
      asserter: this.asserter,
      age: this.abatementTimeable.age,
    };
    if (period) data.period = period;
    if (dateTime) data.dateTime = dateTime;
    return data;
  }

  buildPeriod({ startDate, startTime, endDate, endTime }: Timeable) {
    try {
      const start = this.buildDateTime(startDate, startTime);
      const end = this.buildDateTime(endDate, endTime);
      return { start, end };
    } catch (error) {
      return;
    }
  }

  buildDateTime(dateString: string, time: string) {
    const date = new Date(dateString);
    const [hour, minute] = time.split(":");
    date.setMinutes(Number(minute));
    date.setHours(Number(hour));
    return date.toISOString();
  }

  safeBuildDateTime(dateString: string, time: string) {
    try {
      return this.buildDateTime(dateString, time);
    } catch (error) {
      return;
    }
  }
  

  created() {
    this.setAsserter();
  }
}
</script>
