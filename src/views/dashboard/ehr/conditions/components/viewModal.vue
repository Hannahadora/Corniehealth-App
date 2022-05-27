<template>
  <clinical-dialog v-model="show" title="View Condition" class="">
    <v-form ref="form">
      <div class="grid grid-cols-3 gap-4 w-full mt-5">
        <div>
          <p class="text-gray-400 italic text-sm">Condition</p>
          <span class="text-sm">{{ condition.clinicalStatus }}</span>
        </div>
        <div>
          <p class="text-gray-400 italic text-sm">Clinical Status</p>
          <span class="text-sm">{{ condition.clinicalStatus }}</span>
        </div>
        <div>
          <p class="text-gray-400 italic text-sm">Verification Status</p>
          <span class="text-sm">{{ condition.verificationStatus }}</span>
        </div>
        <div>
          <p class="text-gray-400 italic text-sm">Asserter</p>
          <div class="flex space-x-4">
            <avatar :src="getPractImage(condition.asserterId)"/>
            <div>
              <span class="mb-0 text-sm"
                >Dr {{ getPractitionerName(condition.asserterId) }}</span
              >
              <p class="text-xs">{{ getPractDepartment(condition.asserterId) }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="border-b-2 pb-5 border-dashed border-gray-200">
        <accordion-component title="Basic Info" :opened="true">
          <template v-slot:default>
            <div class="grid grid-cols-2 gap-3 mt-3">
              <cornie-input
                v-model="category.display"
                label="Category"
                placeholder="Autoloaded"
                :disabled="true"
              />
              <cornie-input
                v-model="severity.display"
                label="Severity"
                placeholder="Autoloaded"
                :disabled="true"
              />
              <cornie-input
                v-model="code.display"
                label="Code"
                placeholder="Autoloaded"
                :disabled="true"
              />
              <cornie-input
                v-model="bodysite.display"
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
        <accordion-component title="Onset" :opened="true">
          <template v-slot:default>
            <div>
              <onset-picker
                :disabled="true"
                v-model="onsetmesurable"
                label="Onset"
              />
            </div>
          </template>
        </accordion-component>
      </div>
      <div class="border-b-2 pb-5 border-dashed border-gray-200">
        <accordion-component :opened="true" title="Abatement">
          <template v-slot:default>
            <div>
              <onset-picker
                :disabled="true"
                v-model="abatementMeasurable"
                label="Onset"
              />
            </div>
          </template>
        </accordion-component>
      </div>
      <div class="border-b-2 pb-5 border-dashed border-gray-200">
        <accordion-component title="Recorded" :opened="true">
          <template v-slot:default>
            <div class="mt-8 grid grid-cols-2 gap-4 w-full">
              <div class="">
                <date-time-picker v-model:date="recordDate"  v-model:time="recordTime" :label="'Date/Time'" :disabled="true" />
              </div>
              <cornie-input
                label="Recorder"
                class="-mt-5 w-full"
                placeholder="Autoloaded"
                :disabled="true"
                v-model="recorder"
              >
                <template #labelicon>
                  <custom-checkbox
                    :label="'Assert this record'"
                    class="w-full"
                    v-model="asserterId"
                    :value="authPractitioner.id"
                  />
                </template>
                </cornie-input>
            </div>
          </template>
        </accordion-component>
      </div>
      <div class="border-b-2 pb-5 border-dashed border-gray-200">
        <accordion-component :opened="true" title="Stage">
          <template v-slot:default>
            <div class="grid grid-cols-2 gap-4 mt-5">
              <cornie-input
                v-model="summary"
                :disabled="true"
                label="Summary"
              />
              <cornie-input
                v-model="assessmentName"
                :disabled="true"
                label="Assessment"
              />
              <cornie-input v-model="stage.display" :disabled="true" label="Type" />
            </div>
           <div class="border-t-2 border-dashed border-gray-200 pt-5">
              <span class="text-sm text-danger">Assessment</span>
                <div class="grid grid-cols-2 gap-4 w-full">
                  <div class="bg-white shadow-md p-1 w-full mt-5 rounded-lg" v-for="(item, index) in assessment" :key="index">
                    <div class="flex space-x-4 w-full">
                      <div class="w-full">
                  
                        <p class="font-bold text-sm w-full">
                          {{ item.name }}
                        </p>
                        <p class="text-gray-400 text-xs font-bold">
                           {{ new Date(item.date).toLocaleDateString()}}
                        </p>
              
                        <span class="flex space-x-3 text-black text-xs font-bold w-full">
                            Dr. {{ item.practionerName}} <span class="text-gray-400">. {{ item.department}}</span>
                        </span>
                      </div>
                    </div>
                   
                  </div>
                </div>
    
            </div>
          </template>
        </accordion-component>
      </div>

      <div class="border-b-2 pb-5 border-dashed border-gray-200">
        <accordion-component :opened="true" title="Evidence">
          <template v-slot:default>
            <div class="grid grid-cols-2 justify-between gap-3 mt-3">
              <cornie-input
                v-model="evidencecode.display"
                :disabled="true"
                label="Code"
              />
              <cornie-input
                v-model="evidence.detail"
                :disabled="true"
                label="Detail"
              />
              <cornie-input
                v-model="evidence.note"
                :disabled="true"
                label="Note"
              />
            </div>
          </template>

        </accordion-component>
      </div>
    </v-form>
    <template #optionactions>
      <div class="flex justify-end">

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
  <recorder-modal v-model="showRecorder" />
</template>
<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { string } from "yup";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { printPractitioner } from "@/plugins/utils";
import Condition from "yup/lib/Condition";
import { useFHIRDefinition } from "@/composables/useFHIRDefinition";


import IPractitioner from "@/types/IPractitioner";
import { ICondition } from "@/types/ICondition";

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
import Avatar from "@/components/avatar.vue";


import OnsetPicker from "../components/onset.vue";
import ClinicalDialog from "../clinical-dialog.vue";
import DateTimePicker from "../date-time-picker.vue";



const condition = namespace("condition");

const user = namespace("user");
const practitioner = namespace("practitioner");
const timeable = {
  age: null,
  start: null,
  startTime: null,
  end: null,
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
  date: null,
  time: null,
  endTime: null
};
@Options({
  name: "ViewCondtionModal",
  components: {
    ClinicalDialog,
    CornieBtn,
    AutoComplete,
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
    Avatar
  },
})
export default class ViewCondtionModal extends Vue {
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

  @Prop({ type: Object, required: true })
  condition!: ICondition;

  @practitioner.State
  practitioners!: IPractitioner[];

  @practitioner.Action
  fetchPractitioners!: () => Promise<void>;

  @condition.Action
  getConditionById!: (id: string) => Promise<ICondition>;

   clinicalStatus = setup(() =>
    useFHIRDefinition("http://hl7.org/fhir/ValueSet/condition-clinical")
  );
  verificationStatus = setup(() =>
    useFHIRDefinition("http://hl7.org/fhir/ValueSet/condition-ver-status")
  );
  category = setup(() =>
    useFHIRDefinition("http://hl7.org/fhir/ValueSet/condition-category")
  );
  severity = setup(() =>
    useFHIRDefinition("http://hl7.org/fhir/ValueSet/condition-severity")
  );
  code = setup(() =>
    useFHIRDefinition("http://hl7.org/fhir/ValueSet/condition-code")
  );
  evidencecode = setup(() =>
    useFHIRDefinition("http://hl7.org/fhir/ValueSet/condition-code")
  );
  bodysite = setup(() =>
    useFHIRDefinition("http://hl7.org/fhir/ValueSet/body-site")
  );
  stage = setup(() =>
    useFHIRDefinition("http://hl7.org/fhir/ValueSet/condition-stage-type")
  );


  required = string().required();

  loading = false;
  showRecorder = false;
  // clinicalStatus = "";
  // verificationStatus = "";
  // category = "";
  // severity = "";
  // code = "";
   recorderId = "";
  recordDate = "";
  recordTime = "";
  assessment = [] as any;
  type = "";
  summary = "";
  evidence = {
    code: "",
    detail: "",
    note: ""
  };
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
  asserterId = "";

  assessmentName = ""; 

  @Watch("authPractitioner")
  practitionerChanged(): void {
    this.setAsserter();
  }

  @Watch("id")
  idChanged() {
    this.setCondition();
  }

  async setCondition() {
        const condition = await this.getConditionById(this.id);
    if (!condition) return;
    this.loadDefinitions();
    this.bodySite = condition.bodySite;
    this.summary = condition.summary;
    this.assessment = condition.assessment;
    this.evidence = condition.evidence;
    this.recordDate = condition.recordDate;
    this.recorderId = condition.recorderId;
     this.asserterId = condition.asserterId;

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
      this.abatementTimeable.time as any
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

  get recorder(){
    this.recorderId = this.authPractitioner.id;
    return this.authPractitioner.firstName +' '+ this.authPractitioner.lastName
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

  getPractitionerName(id: string) {
    const pt = this.practitioners.find((i: any) => i.id === id);
    return pt ? `${pt.firstName} ${pt.lastName}` : "";
  }

  getPractImage(id:string){
    const pt = this.practitioners.find((i: any) => i.id === id);
    return pt ? `${pt.image}` : "";
  }

  getPractDepartment(id: string){
    const pt = this.practitioners.find((i: any) => i.id === id);
    return pt ? `${pt.department}` : "";
  }

  loadDefinitions() {
    this.clinicalStatus.code = this.condition?.clinicalStatus;
    this.verificationStatus.code = this.condition?.verificationStatus;
    this.category.code = this.condition?.category;
    this.severity.code = this.condition?.severity;
    this.code.code = this.condition?.code;
    this.evidencecode.code = this.condition?.evidence.code;
    this.bodysite.code = this.condition?.bodySite;
    this.stage.code = this.condition?.type;
  }


  async created() {
    this.loadDefinitions();
    this.setCondition();
    await this.fetchPractitioners();
    this.setAsserter();

  }
}
</script>
