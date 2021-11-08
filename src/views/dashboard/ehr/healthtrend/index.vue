<template>
<<<<<<< HEAD
  <empty-state v-if="empty" />
  <existing-state v-else />
</template>

<script lang="ts">
import { Options,setup, Vue } from "vue-class-component";
import { cornieClient } from "@/plugins/http";
import Avatar from "@/components/avatar.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import { useHandleImage } from "@/composables/useHandleImage";
import PhoneInput from "@/components/phone-input.vue";
import { reactive } from "@vue/reactivity";
import { string } from "yup";
import AvatarField from "@/components/cornie-avatar-field/CornieAvatarField.vue";
import { mapActions, mapState } from "vuex";
import BloodChartt from "./bloodChartt.vue";
import WeightChartt from "./weight-chartt.vue";
=======
  <main>
    <div class="mb-5 p-3 border-l-none -mt-6 w-full">
      <span
        class="
          flex
          border-b-2
          w-full
          font-bold
          text-xl text-primary
          py-2
          mb-5
          mx-auto
        "
      >
        Health Trend
      </span>
      <div class="w-full h-full">
        <div class="w-full grid grid-cols-2 gap-4">
          <blood-chart />
          <weight-chart title="Weight" />
        </div>
        <div class="w-full grid grid-cols-3 gap-4">
          <medication-card />
          <condition-card />
          <allergy-card />
          <diagnostic-card />
          <procedure-card />
          <note-card />
        </div>

        <div class="w-full grid">
          <appointment-card />
          <history-card />
        </div>
      </div>
    </div>
  </main>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
>>>>>>> d9ee342ee977ec356439e98659a2cdec8cb2c1bd

import MedicationCard from "./medicationCard.vue";

import conditionCard from "./conditionCard.vue";
import AllergyCard from "./allergyCard.vue";
import DiagnosticCard from "./diagnosticCard.vue";
import ProcedureCard from "./procedureCard.vue";
import NoteCard from "./noteCard.vue";
import AppointmentCard from "./appointmentCard.vue";
import HistoryCard from "./historyCard.vue";


//for the empty state
import conditionCardd from "./conditionCardd.vue";
import DiagnosticCardd from "./diagnosticCardd.vue";
import ProcedureCardd from "./procedureCardd.vue";
import NoteCardd from "./noteCardd.vue";
import HistoryCardd from "./historyCardd.vue";


import RegistrationChart from "./registration-chart.vue";
import ChartCard from "./chart-card.vue";
import AppointmentChart from "./appointment-chart.vue";
import VisitsChart from "./visits-chart.vue";
import BillingsChart from "./billings-chart.vue";
import MedicationChart from "./medication-chart.vue";
import ReferralChart from "./referral-chart.vue";
// import ResourceChart from "./resource-chart.vue";
import MessagesChart from "./messages-chart.vue";
import InpatientChart from "./inpatient-chart.vue";
import QuestionnaireChart from "./questionnaire-chart.vue";

import { namespace } from "vuex-class";
import { Demographics, Guarantor, IPatient } from "@/types/IPatient";
import { Prop, Ref } from "vue-property-decorator";
import EmptyState from "./empty-state.vue";
import ExistingState from "./existing-state.vue";


const patients = namespace("patients");
<<<<<<< HEAD

@Options({
   name: "HealthIndex",
   components: {
    Avatar,
    CornieInput,
    CornieSelect,
    PhoneInput,
    AvatarField,
    BloodChartt,
    WeightChartt,
    AppointmentChart,
=======
import BloodChart from "./bloodChart.vue";
import WeightChart from "./weight-chart.vue";

@Options({
  name: "HealthTrendIndex",
  components: {
>>>>>>> d9ee342ee977ec356439e98659a2cdec8cb2c1bd
    MedicationCard,
    WeightChart,
    conditionCard,
    BloodChart,
    AllergyCard,

    DiagnosticCard,

    ProcedureCard,

    NoteCard,
    AppointmentCard,
    HistoryCard,
<<<<<<< HEAD
    HistoryCardd,

     EmptyState,
    ExistingState,
    
  },
})
export default class HealthIndex extends Vue {
patient = {} as IPatient;

@patients.Action
  findPatient!: (patientId: string) => Promise<IPatient>;

@Prop({ type: String, default: "" })
  patientId!: string;

async created (){
  console.log('id3', this.patientId);
  this.patient = await this.findPatient(this.patientId)
  console.log('fff1', this.patient)
}

 
  get empty() {
    return !this.patient;
  }

};
=======
  },
})
export default class HelthTrends extends Vue {}
>>>>>>> d9ee342ee977ec356439e98659a2cdec8cb2c1bd
</script>
