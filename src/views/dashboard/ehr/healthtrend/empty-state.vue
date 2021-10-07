<template>
  <main>
      <div class="mb-5 p-3 border-l-none -mt-6 w-full ">
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
        Health Trends
        </span>
        <div class="w-full h-full">
            <div class="w-full grid grid-cols-2 gap-4">
                <blood-chartt/>
                <weight-chartt title="Weight"/>
            </div>
            <div class="w-full grid grid-cols-3 gap-4">
                <!-- <appointment-chart /> -->
                <medication-cardd/>
                <condition-cardd/>
                <allergy-cardd/>
                <diagnostic-cardd/>
                <procedure-cardd/>
                <note-cardd/>
                <!-- <appointment-card/>
                <medication-card/>
                <medication-card/> -->

            </div>

            <div class="w-full grid">
                <appointment-cardd/>
                <history-cardd/>
            </div>
        </div>
      </div>
  </main>
</template>

<script>
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


//for empty state
import conditionCardd from "./conditionCardd.vue";
import AllergyCardd from "./allergyCardd.vue";
import DiagnosticCardd from "./diagnosticCardd.vue";
import ProcedureCardd from "./procedureCardd.vue";
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

export default {
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
    ProcedureCardd,
    NoteCard,
    NoteCardd,
    AppointmentCard,
    AppointmentCardd,
    HistoryCard,
    HistoryCardd,
    
  },
  setup() {
    const { url, placeholder, onChange } = useHandleImage();
    return { img: reactive({ url, placeholder, onChange }) };
  },
  data() {
    return {
      OrganizationName: "",
      image: "",
    };
  },
  computed: {
    ...mapState("organization", {
      organizationInfo: (state) => state.organizationInfo,
    }),
    payload() {
      return {
        name: this.OrganizationName,
      };
    },
  },
  async created() {
   
  },
  methods: {
    
  },
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
