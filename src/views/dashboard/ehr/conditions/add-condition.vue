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
        <timeable-picker v-model="onsetTimeable" />
        <measurable v-model="onsetMeasurable" />
      </accordion-component>
      <accordion-component
        class="shadow-none rounded-none border-none text-primary"
        title="Abatement"
      >
        <timeable-picker v-model="abatementTimeable" />
        <measurable v-model="abatementMeasurable" />
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
      </accordion-component>
      <accordion-component
        class="shadow-none rounded-none border-none text-primary"
        title="Evidence"
      >
        <div class="flex items-center justify-between gap-3 mt-3">
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
            :items="['yes']"
          />
        </div>
        <cornie-text-area
          :rules="required"
          v-model="evidenceNote"
          label="Notes"
          class="w-full"
          rows="4"
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
      <cornie-btn
        :loading="loading"
        @click="submit"
        class="text-white bg-danger px-6 rounded-xl"
      >
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
import Measurable from "./measurable.vue";
import { getDropdown } from "@/plugins/definitions";
// import { ICondition } from "@/types/ICondition";
import { Codeable, Timeable } from "@/types/misc";

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



import { ICondition } from "@/types/ICondition";

const condition = namespace("condition");

// import { Codeable } from "@/types/misc";
import { printPractitioner } from "@/plugins/utils";
import Condition from "yup/lib/Condition";


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
  },
})
export default class AddCondition extends Vue {
    @Prop({ type: String, default: "" })
  patientId!: string;

  @condition.Action
  fetchPatientConditions!: (patientId: string) => Promise<void>;

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
  categories: Codeable[] = [];
  conditionCodes = codes;
  bodySites = bodySites;
  stages = stages;
  evidenceCodes = evidenceCodes;

  loading = false;
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

  async loadDropdown() {
    this.categories = await categories();
  }

  @Watch("authPractitioner")
  practitionerChanged(): void {
    this.setAsserter();
  }

  async setAsserter() {
    this.asserter = this.authPractitioner?.id || "";
  }

  // get patientId() {
  //   return this.$route.params.patientId;
  // }

  get myCoditions(){
    return this.fetchPatientConditions(this.patientId);
  }

  get onset() {
    const { string, ...onsetRange } = this.onsetMeasurable;
    const dateTime = this.safeBuildDateTime(
      this.onsetTimeable.date,
      this.onsetTimeable.time
    );
    const period = this.buildPeriod(this.onsetTimeable);
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
      this.abatementTimeable.date,
      this.abatementTimeable.time
    );
    const period = this.buildPeriod(this.abatementTimeable);
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
      assessment: {
        reference: "Clinical Impression",
        id: "a2ba4fa9-7829-4eb8-b8ef-e6d9226d6757",
      },
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
      console.log(error);
      window.notify({ msg: "Condition not created", status: "error" });
    }
  }

  created() {
    this.loadDropdown();
    this.setAsserter();
  }
}
</script>
