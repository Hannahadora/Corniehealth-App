<template>
  <big-dialog
    v-model="show"
    title="New History"
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
            v-model="instantiatesCanonical"
            label="Instantiates Canonical"
            :items="['clinicalStatuses']"
            :rules="required"
          />
          <cornie-select
            v-model="instantiatesUri"
            label="Instantiates Uri"
            :items="['verificationStatuses']"
            :rules="required"
          />
          <auto-complete
            v-model="status"
            :rules="required"
            :items="['categories']"
            label="Status"
          />
          <cornie-select
            v-model="dataAbsentReason"
            label="Data Absent Reason"
            :rules="required"
            :items="['severities']"
          />
        <cornie-input disabled  :rules="required" label="Patient" v-model="name"  class="w-full" />
           <date-picker
            :rules="required"
            v-model="date"
            label="Date"
            width="w-full"
          />
           <cornie-input  :rules="required"  label="Relationship" v-model="relationship"  class="w-full" />
          <auto-complete
            v-model="sex"
            :rules="required"
            :items="['conditionCodes']"
            label="Sex"
          />
        </div>
      </accordion-component>
        <accordion-component
        class="shadow-none rounded-none border-none text-primary"
        title="Born"
      >
        <div class="grid grid-cols-2 gap-3 mt-3">
          
          <cornie-input  :rules="required"  label="Born String" v-model="bornString"  class="w-full" />
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
  </big-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import BigDialog from "@/components/bigdialog.vue";
import AccordionComponent from "@/components/dialog-accordion.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieTextArea from "@/components/textarea.vue";
import DatePicker from "@/components/datepicker.vue";
// import EncounterSelect from "./encounter-select.vue";
// import AssessmentSelect from "./assessment-select.vue";
// import PractitionerSelect from "./practitioner-select.vue";
 import { IPatient } from "@/types/IPatient";
import AutoComplete from "@/components/autocomplete.vue";
import CornieBtn from "@/components/CornieBtn.vue";

import { namespace } from "vuex-class";
import { string } from "yup";
import { cornieClient } from "@/plugins/http";

const history = namespace("history");
const patients = namespace("patients");

@Options({
  name: "AddMedicalHistory",
  components: {
    BigDialog,
    CornieBtn,
    AutoComplete,
    DatePicker,
    // EncounterSelect,
    // AssessmentSelect,
    // PractitionerSelect,
    AccordionComponent,
    CornieSelect,
    CornieInput,
    CornieTextArea,
  },
})
export default class AddCondition extends Vue {
  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  @PropSync("modelValue")
  show!: boolean;

  @patients.State
  patients!: IPatient[];

    @patients.Action
  fetchPatients!: () => Promise<void>;  

  required = string().required();



  InstantiatesCanonical = "";
  instantiatesUriStart = "";
  instantiatesUriEnd = "";
  status = "";
  dataAbsentReason = "";
  date = "";
  name = this.PatientName.firstname +' '+ this.PatientName.lastname;
  relationship = "";
  sex = "";



  startAndEndDateTimeStart = "";
  startAndEndDateTimeEnd = "";
  bornDateTime = "";
  bornString = 0;
  

   oneage = 0;
  ageRangeMin = "";
  ageRangeMax = "";
  ageString="";
  estimatedAge=0;

    diseasedBoolean = false;
    deceasedAge = 0;
    deceasedRangeMin = "";
     deceasedRangeMax = "";
    deceasedDate = "";
    deceasedString = "";
    reasonCode = "";
    reasonReference = "";
    note = "";
    condition = "";
    code = "";
    outcome = "";
    contributedToDeath = "";
  
    onsetAge = 0;
    onsetstartAndEndDateTimeStart =  "";
    onsetstartAndEndDateTimeEnd =  "";
    onsetRangeMin = "";
    onsetRangeMax = "";
    onsetnote = "";
    onsetString = "";




  get patientId() {
    return this.$route.params.id;
  }
    get PatientName() {
        const id = this.$route.params.id;
        const pt = this.patients.find((i: any) => i.id === id);
        return {
            ...pt
        }
    }

  get onset() {
    return {
    onsetAge: this.onsetAge,
    startAndEndDateTime: { start: new Date(this.onsetstartAndEndDateTimeStart).toISOString(), end: new Date(this.onsetstartAndEndDateTimeEnd).toISOString() },
      onsetRange: { min: this.onsetRangeMin, max: this.onsetRangeMax },
      note: this.onsetnote,
      onsetString: this.onsetString,
    };
  }

   get born() {
    return {
    startAndEndDateTime: { start: new Date(this.startAndEndDateTimeStart).toISOString(), end: new Date(this.startAndEndDateTimeEnd).toISOString() },
    bornDateTime: new Date(this.bornDateTime).toISOString(),
    bornString: this.bornString,
    };
  }
  get basicInfo() {
    return {
    InstantiatesCanonical: this.InstantiatesCanonical,
    instantiatesUri: { start: new Date(this.instantiatesUriStart).toISOString(), end: new Date(this.instantiatesUriEnd).toISOString() },
    status: this.status,
    dataAbsentReason: this.dataAbsentReason,
    date: new Date(this.date).toISOString(),
    name: this.name,
    relationship: this.relationship,
    sec: this.sex,
    };
  }
 
  get age() {
    return {
    age: this.oneage,
    ageRange:  { min: this.ageRangeMin, max: this.ageRangeMax },
    ageString: this.ageString,
    estimatedAge: this.estimatedAge,
    };
  }

  get deceased() {
    return {
    diseasedBoolean: this.diseasedBoolean,
    deceasedAge: this.deceasedAge,
    deceasedRange:  { min: this.deceasedRangeMin, max: this.deceasedRangeMax },
    deceasedDate: new Date(this.deceasedDate).toISOString(),
    deceasedString: this.deceasedString,
     reasonCode: this.reasonCode,
      reasonReference: this.reasonReference,
       note: this.note, 
       condition: this.condition,
       code: this.code,
       outcome: this.outcome,
       contributedToDeath: this.contributedToDeath,

    };
  }


  get payload() {
    return {
      patientId: this.patientId,
      basicInfo: this.basicInfo,
      born: this.born,
      age: this.age,
      deceased: this.deceased,
      onset: this.onset,
    };
  }

  async submit() {
    const { valid } = await (this.$refs.form as any).validate();
    if (!valid) return;
    try {
      const { data } = await cornieClient().post(
        "/api/v1/family-history",
        this.payload
      );
      window.notify({ msg: "Medical family history created", status: "success" });
    } catch (error) {
      window.notify({ msg: "Medical family history not created", status: "error" });
    }
  }

 async created() {
   this.fetchPatients()
  }
}
</script>
