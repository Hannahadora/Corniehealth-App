<template>
  <clinical-dialog v-model="show" class="w-6/12 h-full" :title="newaction ">
    <v-form ref="form">
      <div class="border-b-2 pb-5 border-dashed border-gray-200">
        <accordion-component
          title="Basic Info"
          :opened="true"
        >
        <template v-slot:default>
            <div class="grid grid-cols-2 gap-3 mt-3">
              <!-- <fhir-input
                v-model="clinicalStatus"
                label="Clinical Status"
                reference="http://hl7.org/fhir/ValueSet/condition-clinical"
                :rules="required"
              />
              <fhir-input
                v-model="verificationStatus"
                label="Verification Status"
                reference="http://hl7.org/fhir/ValueSet/condition-ver-status"
                :rules="required"
              /> -->
              <fhir-input
                reference="http://hl7.org/fhir/ValueSet/condition-category"
                v-model="category"
                :rules="required"
                label="Category"
                placeholder="Select"
              />
              <fhir-input
                v-model="severity"
                label="Severity"
                :rules="required"
                reference="http://hl7.org/fhir/ValueSet/condition-severity"
                placeholder="Select"
              />
              <fhir-input
                v-model="code"
                :rules="required"
                label="Code"
                reference="http://hl7.org/fhir/ValueSet/condition-code"
                placeholder="Select"
              />
              <fhir-input
                v-model="bodySite"
                reference="http://hl7.org/fhir/ValueSet/body-site"
                :rules="required"
                label="Body Site"
                placeholder="Select"
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
                <onset-picker v-model="onsetmesurable" label="Onset" :name="'onset'" />
            </div>
          </template>
          </accordion-component>
      </div>
      <div class="border-b-2 pb-5 border-dashed border-gray-200">
          <accordion-component
              :opened="false"
            title="Abatement"
            :grayCaption="true"
          >
          <template v-slot:default>
                <div>
                    <onset-picker v-model="abatementMeasurable" label="Abatement" :name="'abatement'"/>
                </div>
          </template>
          </accordion-component>
      </div>
      <div class="border-b-2 pb-5 border-dashed border-gray-200">
            <accordion-component title="Recorded" :opened="false">
              <template v-slot:default>
                <div class="mt-8 grid grid-cols-2 gap-4 w-full">
                  <div class="mt-1">
                    <date-time-picker  v-model:date="recordDate"  v-model:time="recordTime"  :label="'Date/Time'" />
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
                        :value="asserterId"
                      />
                    </template>
                    </cornie-input>
                  <!-- <cornie-input
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
                  </cornie-input> -->
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
              <cornie-input v-model="summary" label="Summary" />
              <assessment-select
                :patientId="patientId"
                v-model="assessmentName"
                label="Assessment"
                @asses-data="assesdata"
              />
              <fhir-input
                v-model="type"
                reference="http://hl7.org/fhir/ValueSet/condition-stage-type"
                label="Type"
                placeholder="Select"
              />
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
                      <div class="float-right flex justify-end w-full">
                        <div class="bg-blue-50 p-3 -m-1 rounded-r-lg">
                          <delete-red
                            class="mt-1 cursor-pointer"
                            @click="deleteAsses(index)"
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
            <fhir-input
              v-model="evidence.code"
              :rules="required"
              reference="http://hl7.org/fhir/ValueSet/manifestation-or-symptom"
              label="Code"
              placeholder="Select"
            />
            <cornie-input
              :rules="required"
              v-model="evidence.detail"
              label="Detail"
              placeholder="Enter"
            />
              <cornie-input
               :rules="required"
                v-model="evidence.note"
                label="Note"
                class="mb-5 w-full"
                placeholder="Enter"
                >
                </cornie-input>
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
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            v-if="!id"
            :loading="loading"
            @click="submit"
            class="text-white bg-danger px-6 rounded-xl"
          >
            Save
          </cornie-btn>
          <cornie-btn
            v-else
            :loading="loading"
            @click="submit"
            class="text-white bg-danger px-6 rounded-xl"
          >
            Update
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

import { ICondition, Abatement, OnSet } from "@/types/ICondition";

const condition = namespace("condition");

// import { Codeable } from "@/types/misc";
import { printPractitioner } from "@/plugins/utils";
import Condition from "yup/lib/Condition";
import ConditionOccurence from "./add-occurence.vue";

const user = namespace("user");

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

  
  @condition.Action
  getConditionById!: (id: string) => Promise<ICondition>;

  required = string().required();

  loading = false;
  showRecorder = false;
  clinicalStatus = "active";
  verificationStatus = "confirmed";
  category = "";
  severity = "";
  code = "";
  bodySite = "";
  referenceEncounter = "";

  asserter = "";
  assessmentName = "";

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

  abatement = [] as any;

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
  asserterId = "";

  @Watch("authPractitioner")
  practitionerChanged(): void {
    this.setAsserter();
  }

  async setAsserter() {
    this.asserter = this.authPractitioner?.id || "";
  }
 @Watch("id")
  idChanged() {
    this.setCondition();
  }

  async setCondition() {
        const condition = await this.getConditionById(this.id);
    if (!condition) return;
    this.clinicalStatus = condition.clinicalStatus;
    this.verificationStatus = condition.verificationStatus;
    this.type = condition.type;
    this.category = condition.category;
    this.summary = condition.summary;
    this.evidenceDetail = condition.detail;
    this.bodySite = condition.bodySite;
    this.assessment = condition.assessment;
    this.severity = condition.severity;
    this.evidenceNote = condition.evidenceNote;
   // this.onsetmesurable.unit = condition?.onSet?.range?.unit || null;






     this.abatement = condition.abatement;
    this.evidence = condition.evidence;
    this.code = condition.code;
    this.recordDate = condition.recordDate;
    this.recorderId = condition.recorderId;
     this.asserterId = condition.asserterId;

  }

   get newaction() {
    return this.id ? "Edit Condition" : "New Condition";
  }

  assesdata(value:any){
    this.assessmentName = value.name;
    this.assessment.push(value);
  }

  deleteAsses(index: number) {
        this.assessment.splice(index, 1);
  }

  get patientId() {
    return this.$route.params.id;
  }

   get onset() {
    return  {
      range: !Object.values({
        unit: this.onsetmesurable.unit,
        min: this.onsetmesurable.min,
        max: this.onsetmesurable.max,
      }).every(o => o === null) ? {
        unit: this.onsetmesurable.unit,
        min: this.onsetmesurable.min,
        max: this.onsetmesurable.max,
      } : null,
      age: !Object.values({
        unit: this.onsetmesurable.ageUnit,
        value: this.onsetmesurable.ageValue,
      }).every(o => o === null) ? {
        unit: this.onsetmesurable.ageUnit,
        value: this.onsetmesurable.ageValue,
      } : null, 
      string: this.onsetmesurable.string || null,
      period: !Object.values({
        start: this.onsetmesurable.startDate,
        end: this.onsetmesurable.endDate,
        startTime:this.onsetmesurable.startTime,
        endTime: this.onsetmesurable.endTime,
      }).every(o => o === null) ? {
        start: this.onsetmesurable.startDate,
        end: this.onsetmesurable.endDate,
         startTime:this.onsetmesurable.startTime,
        endTime: this.onsetmesurable.endTime,
      } : null,
      dateTime:  this.safeBuildDateTime(
       this.onsetmesurable.date as any,
       this.onsetmesurable.time as any
     ),
    } as any;
  }
  get setabatement() {
    return {
      range: !Object.values({
        unit: this.abatementMeasurable.unit,
        min: this.abatementMeasurable.min,
        max: this.abatementMeasurable.max,
      }).every(o => o === null) ? {
        unit: this.abatementMeasurable.unit,
        min: this.abatementMeasurable.min,
        max: this.abatementMeasurable.max,
      } : null,
      age: !Object.values({
        unit: this.abatementMeasurable.ageUnit,
        value: this.abatementMeasurable.ageValue,
      }).every(o => o === null) ? {
        unit: this.abatementMeasurable.ageUnit,
        value: this.abatementMeasurable.ageValue,
      } : null, 
      string: this.abatementMeasurable.string || null,
      period: !Object.values({
        start: this.abatementMeasurable.startDate,
        end: this.abatementMeasurable.endDate,
        startTime:this.abatementMeasurable.startTime,
        endTime: this.abatementMeasurable.endTime,
      }).every(o => o === null) ? {
        start: this.abatementMeasurable.startDate,
        end: this.abatementMeasurable.endDate,
         startTime:this.abatementMeasurable.startTime,
        endTime: this.abatementMeasurable.endTime,
      } : null,
      dateTime:  this.safeBuildDateTime(
       this.abatementMeasurable.date as any,
       this.abatementMeasurable.time as any
     ),
    };
  }

  //get onset() {
    // const { string, ...onsetRange } = this.onsetMeasurable;
    // const onsetDateTime = this.safeBuildDateTime(
    //   this.onsetTimeable.date as any,
    //   this.onsetTimeable.time as any
    // );
    // const onsetAge = this.onsetMeasurable.age;
    // const onsetPeriod = this.buildPeriod(this.onsetTimeable as any);

    // const onsetRange = ;
    // const data: any = {
    //   age: this.onsetTimeable.age,
    //   onsetString: this.onsetMeasurable.string,
    // };
    // if (onsetRange.unit && onsetRange.min && onsetRange.max)
    //   data.range = onsetRange;
    // if (onsetPeriod) data.period = onsetPeriod;
    // if (onsetDateTime) data.dateTime = onsetDateTime;
    // return data;
 // }

  // get abatement() {
  //   const { string, ...range } = this.abatementMeasurable;
  //   const dateTime = this.safeBuildDateTime(
  //     this.abatementTimeable.date as any,
  //     this.abatementTimeable.time as any,
  //   );
  //   const period = this.buildPeriod(this.abatementTimeable as any);
  //   const data: any = {
  //     range,
  //     string,
  //     asserter: this.asserter,
  //     age: this.abatementTimeable.age,
  //   };
  //   if (period) data.period = period;
  //   if (dateTime) data.dateTime = dateTime;
  //   return data;
  // }

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
  get recorder(){
    this.recorderId = this.authPractitioner.id;
    this.asserterId = this.authPractitioner.id;
    return this.authPractitioner.firstName +' '+ this.authPractitioner.lastName
  }
  get payload() {
    this.abatement.push(this.setabatement);
    return {
      patientId: this.patientId,
      encounterId: this.referenceEncounter || null,
      clinicalStatus: this.clinicalStatus,
      verificationStatus: this.verificationStatus,
      type: this.type,
      category: this.category,
      summary: this.summary,
      detail: this.evidenceDetail,
      bodySite: this.bodySite,
      assessment: this.assessment,
      severity: this.severity,
      evidence: this.evidence,
      onSet: this.onset,
      abatement: this.abatement,
      code: this.code,
      recordDate: this.recordDate,
      recorderId: this.recorderId,
      asserterId: this.asserterId,

    };
  }

    async submit() {
    this.loading = true;
    if (this.id) await this.updateCondition();
    else await this.create();
    this.loading = false;
  }
  async create() {
    const { valid } = await (this.$refs.form as any).validate();
    if (!valid) return;
    try {
      const { data } = await cornieClient().post(
        "/api/v1/condition",
        this.payload
      );
      window.notify({ msg: "Condition created", status: "success" });
      this.done();
    } catch (error) {
      window.notify({ msg: "Condition not created", status: "error" });
    }
  }

   async updateCondition() {
    const { valid } = await (this.$refs.form as any).validate();
    if (!valid) return;
    const id = this.id;
    const url = `/api/v1/condition/${id}`;
    const payload = this.payload;
    try {
      const response = await cornieClient().put(url, this.payload);
      if (response.success) {
        window.notify({
          msg: "Condition Updated",
          status: "success",
        });
        this.done();
      }
    } catch (error: any) {
      window.notify({ msg: error.response.data.message, status: "error" });
    }
  }
 


  done() {
    this.show = false;
    this.$emit("conditionAdded");
  }

  created() {
    this.setCondition();
    this.setAsserter();
  }
}
</script>
