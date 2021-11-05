<template>
  <empty-state v-if="false" />
  <!-- <empty-state v-if="empty" /> -->
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

import MedicationCard from "./medicationCard.vue";
import MedicationCardd from "./medicationCardd.vue";

import conditionCard from "./conditionCard.vue";
import AllergyCard from "./allergyCard.vue";
import DiagnosticCard from "./diagnosticCard.vue";
import ProcedureCard from "./procedureCard.vue";
import NoteCard from "./noteCard.vue";
import AppointmentCard from "./appointmentCard.vue";
import HistoryCard from "./historyCard.vue";


//for the empty state
import conditionCardd from "./conditionCardd.vue";
import AllergyCardd from "./allergyCardd.vue";
import DiagnosticCardd from "./diagnosticCardd.vue";
// import ProcedureCardd from "./procedureCardd.vue";
import NoteCardd from "./noteCardd.vue";
import AppointmentCardd from "./appointmentCardd.vue";
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
    MedicationCard,
    MedicationCardd,
    conditionCard,
    conditionCardd,
    AllergyCard,
    AllergyCardd,
    DiagnosticCard,
    DiagnosticCardd,
    ProcedureCard,
    // ProcedureCardd,
    NoteCard,
    NoteCardd,
    AppointmentCard,
    AppointmentCardd,
    HistoryCard,
    HistoryCardd,

     EmptyState,
    ExistingState,
    
  },
})

export default class HealthIndex extends Vue {
patient = {} as IPatient;


@Prop({ type: String, default: "" })
  patientId!: string;

@patients.Action
  findPatient!: (patientId: string) => Promise<IPatient>;



async created (){
  console.log('id3', this.patientId);
  this.patient = await this.findPatient(this.patientId)
  console.log('fff1', this.patient)
}

 
  get empty() {
    return !this.patient;
  }

};
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
