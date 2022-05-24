<template>
  <clinical-dialog v-model="show" title="New Condition" class="">
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
                <onset-picker v-model="onsetmesurable" label="Onset" />
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
                    <onset-picker v-model="abatementMeasurable" label="Onset" />
                </div>
          </template>
          </accordion-component>
      </div>
      <div class="border-b-2 pb-5 border-dashed border-gray-200">
            <accordion-component title="Recorded" :opened="false">
              <template v-slot:default>
                <div class="mt-8 grid grid-cols-2 gap-4 w-full">
                  <div class="">
                    <date-time-picker :label="'Date/Time'" :disabled="true" />
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
              <cornie-input v-model="stageSummary" label="Summary" />
              <assessment-select
                :patientId="patientId"
                v-model="stageAssessment"
                label="Assessment"
              />
              <fhir-input
                v-model="stageType"
                reference="http://hl7.org/fhir/ValueSet/condition-stage-type"
                label="Type"
              />
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
            <fhir-input
              v-model="evidenceCode"
              :rules="required"
              reference="http://hl7.org/fhir/ValueSet/manifestation-or-symptom"
              label="Code"
            />
            <cornie-input
              :rules="required"
              v-model="evidenceDetail"
              label="Detail"
            />
              <cornie-input
               :rules="required"
            v-model="evidenceNote"
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
          <span
            v-if="!id"
            class="text-sm font-bold text-danger float-left flex justify-start w-full cursor-pointer"
            @click="SaveDraftGrn"
          >
            Save as draft
          </span>
          <span
            v-else
            class="text-sm font-bold text-danger float-left flex justify-start w-full cursor-pointer"
            @click="completeDraft"
          >
            Complete draft
          </span>

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
  get payload() {
    return {
      patientId: this.patientId,
      encounterId: this.referenceEncounter,
      clinicalStatus: this.clinicalStatus,
      verificationStatus: this.verificationStatus,
      type: this.stageType,
      category: this.category,
      summary: this.stageSummary,
      detail: this.evidenceDetail,
      bodySite: this.bodySite,
      assessment: this.stageAssessment,
      severity: this.severity,
      evidenceNote: this.evidenceNote,
      onSet: this.onset,
      abatement: this.abatement,
      code: this.code,
    };
  }

  async submit() {
    this.loading = true;
    await this.create();
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
      this.show = false;
    } catch (error) {
      window.notify({ msg: "Condition not created", status: "error" });
    }
  }
  async SaveDraftGrn() {
    const { valid } = await (this.$refs.form as any).validate();
    if (!valid) return;

    try {
      const response = await cornieClient().post(
        "/api/v1/inventory/material-request/draft",
        this.payload
      );
      if (response.success) {
        window.notify({
          msg: "Material request draft saved",
          status: "success",
        });
        this.done();
      }
    } catch (error: any) {
      window.notify({ msg: error.response.data.message, status: "error" });
    }
  }
    async completeDraft() {
    const { valid } = await (this.$refs.form as any).validate();
    if (!valid) return;
    const id = this.id;
    const url = `/api/v1/inventory/material-request/draft/complete/${id}`;
    const payload = this.payload;
    try {
      const response = await cornieClient().put(url, this.payload);
      if (response.success) {
        window.notify({
          msg: "Material Request draft completed",
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
    this.$emit("requestAdded");
  }

  created() {
    this.setAsserter();
  }
}
</script>
