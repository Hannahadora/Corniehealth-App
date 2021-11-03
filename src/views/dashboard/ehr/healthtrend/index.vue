<template>
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

import MedicationCard from "./medicationCard.vue";

import conditionCard from "./conditionCard.vue";
import AllergyCard from "./allergyCard.vue";
import DiagnosticCard from "./diagnosticCard.vue";
import ProcedureCard from "./procedureCard.vue";
import NoteCard from "./noteCard.vue";
import AppointmentCard from "./appointmentCard.vue";
import HistoryCard from "./historyCard.vue";
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

    ProcedureCard,

    NoteCard,
    AppointmentCard,
    HistoryCard,
  },
})
export default class HelthTrends extends Vue {}
</script>
