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
          <referral-card :referrals="referrals" />
          <!-- <note-card /> -->
          <appointment-card
            @showAppointment="showAppointmentModal = true"
            :appointments="appointments"
            :viewAllLink="viewAllAppointment"
          />
        </div>

        <div class="w-full grid gap-8 mt-8">
          <!-- <appointment-card /> -->
          <history-card />
        </div>
      </div>
    </div>
    <appointment-modal v-model="showAppointmentModal" />
  </main>
</template>
<script lang="ts">
  import AppointmentModal from "@/views/dashboard/ehr/appointment/appointmentDialog.vue";
  import { Options, Vue } from "vue-class-component";

  import MedicationCard from "@/components/medicationCard.vue";

  import AppointmentCard from "@/components/appointmentCard.vue";
  import { cornieClient } from "@/plugins/http";
  import AllergyCard from "./allergyCard.vue";
  import conditionCard from "./conditionCard.vue";
  import DiagnosticCard from "./diagnosticCard.vue";
  import HistoryCard from "./historyCard.vue";
  import NoteCard from "./noteCard.vue";
  import ReferralCard from "./referralCard.vue";

  // import ResourceChart from "./resource-chart.vue";

  import { namespace } from "vuex-class";
  import BloodChart from "./bloodChart.vue";
  import WeightChart from "./weight-chart.vue";

  const patients = namespace("patients");

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
      AppointmentModal,
    },
  })
  export default class HelthTrends extends Vue {
    diagnostics: any = [];
    medications: any = [];
    allergies: any = [];
    appointments: any = [];
    referrals: any = [];
    conditions: any = [];
    showAppointmentModal = false;

    get patientId() {
      return this.$route.params.id as string;
    }

    get viewAllAppointment() {
      return `/dashboard/provider/clinical/${this.patientId}/appointments`;
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
