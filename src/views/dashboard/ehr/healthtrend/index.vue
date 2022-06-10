<template>
  <main>
    <div class="mb-5 p-3 border-l-none -mt-6 w-full">
      <span
        class="flex border-b-2 w-full font-bold text-xl text-primary py-2 mb-5 mx-auto"
      >
        Health Trend
      </span>
      <div class="w-full h-full">
        <div class="w-full grid grid-cols-2 gap-8 mb-8">
          <blood-chart />
          <weight-chart title="Weight" />
        </div>
        <div class="w-full grid grid-cols-3 gap-8">
          <condition-card :conditions="conditions" />
          <diagnostic-card :diagnostics="diagnostics" />
          <medication-card :medications="medications" />
          <allergy-card :allergys="allergies" />
          <referral-card :referrals="referrals"/>
          <!-- <note-card /> -->
          <appointment-card :appointments="appointments"/>
        </div>

        <div class="w-full grid gap-8 mt-8">
          <!-- <appointment-card /> -->
          <history-card />
        </div>
      </div>
    </div>
  </main>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

import MedicationCard from "./medicationCard.vue";

import conditionCard from "./conditionCard.vue";
import AllergyCard from "./allergyCard.vue";
import DiagnosticCard from "./diagnosticCard.vue";
import ReferralCard from "./referralCard.vue";
import NoteCard from "./noteCard.vue";
import AppointmentCard from "./appointmentCard.vue";
import HistoryCard from "./historyCard.vue";
import { cornieClient } from "@/plugins/http";

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
import BloodChart from "./bloodChart.vue";
import WeightChart from "./weight-chart.vue";

@Options({
  name: "HealthTrendIndex",
  components: {
    MedicationCard,
    WeightChart,
    conditionCard,
    BloodChart,
    AllergyCard,
    DiagnosticCard,
    ReferralCard,
    NoteCard,
    AppointmentCard,
    HistoryCard,
  },
})
export default class HelthTrends extends Vue {
  diagnostics = <any>[];
  medications = <any>[];
  allergies = <any>[];
  appointments = <any>[];
  referrals = <any>[];
  conditions = <any>[];

  get patientId() {
    return this.$route.params.id as string;
  }

  async fetchHealthTrend() {
    const url = `/api/v1/health-trends/all/${this.patientId}`;
    try {
      const response: any = await cornieClient().get(url);
      if (response.success) {
        this.diagnostics = response.data.diagnostics;
        this.medications = response.data.medication;
        this.allergies = response.data.allergies;
        this.appointments = response.data.appointments;
        this.referrals = response.data.referrals;
        this.conditions = response.data.conditions;
      }
    } catch (e: any) {
      window.notify({
        msg: "There was an error when fetching health trends",
        status: "error",
      });
    }
  }

  async created() {
    await this.fetchHealthTrend();
  }
}
</script>
