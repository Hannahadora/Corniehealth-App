<template>
  <clinical-dialog
    v-model="show"
    title="New Condition"
    subtext="All Fields are required"
    class=""
  >
    <v-form ref="form">
      <accordion-component
        class="shadow-none rounded-none border-none text-primary"
        title="Basic Info"
        :opened="true"
      >
        <div class="grid grid-cols-2 gap-3 mt-3">
          <cornie-select
            v-model="clinicalStatus"
            label="Clinical Status"
            :items="clinicalStatuses"
            :rules="required"
          />
          <cornie-select
            v-model="verificationStatus"
            label="Verification Status"
            :items="verificationStatuses"
            :rules="required"
          />
          <auto-complete
            v-model="category"
            :rules="required"
            :items="categories"
            label="Category"
          />
          <cornie-select
            v-model="severity"
            label="Severity"
            :rules="required"
            :items="severities"
          />
          <auto-complete
            v-model="code"
            :rules="required"
            :items="conditionCodes"
            label="Code"
          />
          <auto-complete
            v-model="bodySite"
            :items="bodySites"
            :rules="required"
            label="Body Site"
          />
          <encounter-select
            v-model="referenceEncounter"
            :rules="required"
            label="Reference Encounter"
          />
        </div>
      </accordion-component>
      <accordion-component
        class="shadow-none rounded-none border-none text-primary"
        title="Onset"
      >
        <div class="grid grid-cols-2 gap-3 mt-3">
          <date-time-picker
            v-model:date="onsetDate"
            v-model:time="onsetTime"
            label="Date/Time"
            width="w-11/12"
          />
          <cornie-input v-model="onsetAge" label="Age" class="" />
          <date-time-picker
            v-model:date="onsetStartDate"
            v-model:time="onsetStartTime"
            label="Start Date/Time"
            width="w-11/12"
          />
          <date-time-picker
            v-model:date="onsetEndDate"
            v-model:time="onsetEndTime"
            label="End Date/Time"
            width="w-11/12"
          />
        </div>
        <div class="grid grid-cols-3 gap-3 mt-4">
          <cornie-input v-model="onsetMin" label="Range (min)" />
          <cornie-input v-model="onsetMax" label="Range (max)" />
          <cornie-input v-model="onsetString" label="String" />
        </div>
      </accordion-component>
      <accordion-component
        class="shadow-none rounded-none border-none text-primary"
        title="Abatement"
      >
        <div class="grid grid-cols-2 gap-3 mt-3">
          <date-time-picker
            v-model:date="abatementDate"
            v-model:time="abatementTime"
            label="Date/Time"
            width="w-11/12"
          />
          <cornie-input v-model="abatementAge" label="Age" class="" />
          <date-time-picker
            v-model:date="abatementStartDate"
            v-model:time="abatementStartTime"
            label="Start Date/Time"
            width="w-11/12"
          />
          <date-time-picker
            v-model:date="abatementEndDate"
            v-model:time="abatementEndTime"
            label="End Date/Time"
            width="w-11/12"
          />
        </div>
        <div class="grid grid-cols-3 gap-3 mt-4">
          <cornie-input v-model="abatementMin" label="Range (min)" />
          <cornie-input v-model="abatementMax" label="Range (max)" />
          <cornie-input v-model="abatementString" label="String" />
        </div>
        <span class="grid grid-cols-2 gap-3 mt-3">
          <practitioner-select
            :rules="required"
            v-model="asserter"
            label="Asserter"
          />
        </span>
      </accordion-component>
      <accordion-component
        class="shadow-none rounded-none border-none text-primary"
        title="Stage"
      >
        <div class="grid grid-cols-3 gap-3 mt-3">
          <cornie-input v-model="stageSummary" label="Summary" />
          <auto-complete v-model="stageType" :items="stages" label="Type" />
          <assessment-select v-model="stageAssessment" label="Assessment" />
        </div>
        <cornie-text-area v-model="stageNote" label="Notes" class="w-full" />
      </accordion-component>
      <accordion-component
        class="shadow-none rounded-none border-none text-primary"
        title="Evidence"
      >
        <div class="grid grid-cols-2 gap-3 mt-3">
          <auto-complete
            v-model="evidenceCode"
            :rules="required"
            :items="evidenceCodes"
            label="Code"
          />
          <cornie-select
            :rules="required"
            v-model="evidenceDetail"
            label="Detail"
          />
        </div>
        <cornie-text-area
          :rules="required"
          v-model="evidenceNote"
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
      <cornie-btn @click="submit" class="text-white bg-danger px-3 rounded-xl">
        Create New Condition
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

const user = namespace("user");

@Options({
  name: "AddCondition",
  components: {
    ClinicalDialog,
    CornieBtn,
    AutoComplete,
    EncounterSelect,
    AssessmentSelect,
    PractitionerSelect,
    AccordionComponent,
    CornieSelect,
    CornieInput,
    CornieTextArea,
    DateTimePicker,
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

  onsetDate = "";
  onsetTime = "";
  onsetAge = "";
  onsetStartDate = "";
  onsetStartTime = "";
  onsetEndDate = "";
  onsetEndTime = "";
  onsetMin = "";
  onsetMax = "";
  onsetString = "";

  abatementDate = "";
  abatementTime = "";
  abatementAge = "";
  abatementStartDate = "";
  abatementStartTime = "";
  abatementEndDate = "";
  abatementEndTime = "";
  abatementMin = "";
  abatementMax = "";
  abatementString = "";

  stageSummary = "";
  stageType = "";
  stageAssessment = "";
  stageNote = "";

  evidenceCode = "";
  evidenceDetail = "";
  evidenceNote = "";

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
    return {
      dateTime: this.buildDateTime(this.onsetDate, this.onsetTime),
      age: this.onsetAge,
      period: this.buildPeriod(
        this.onsetStartDate,
        this.onsetStartTime,
        this.onsetEndDate,
        this.onsetEndTime
      ),
      range: { min: this.abatementMin, max: this.abatementMax },
      onsetString: this.abatementString,
    };
  }

  get abatement() {
    return {
      abatementDateTime: this.buildDateTime(
        this.abatementDate,
        this.abatementTime
      ),
      abatementAge: this.abatementAge,
      abatementPeriod: this.buildPeriod(
        this.abatementStartDate,
        this.abatementStartTime,
        this.abatementEndDate,
        this.abatementEndTime
      ),
      abatementRange: { min: this.abatementMin, max: this.abatementMax },
      abatementString: this.abatementString,
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
      notes: this.stageNote,
      bodySite: this.bodySite,
      subject: "patient",
      assesment: "",
      severity: this.severity,
      evidenceNote: this.evidenceNote,
      onset: this.onset,
      abatement: this.abatement,
    };
  }

  async submit() {
    const { valid } = await (this.$refs.form as any).validate();
    console.log({ valid });
  }

  created() {
    this.loadDropdown();
    this.setAsserter();
  }
}
</script>
