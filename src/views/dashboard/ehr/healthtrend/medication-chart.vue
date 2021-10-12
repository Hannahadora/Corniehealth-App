<template>
  <chart-card height="439px" title="Medication">
    <canvas ref="chart"></canvas>
  </chart-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChartCard from "./chart-card.vue";
import { Chart } from "chart.js";

@Options({
  name: "MedicationChart",
  components: {
    ChartCard,
  },
})
export default class MedicationChart extends Vue {
  chart!: Chart;
  mounted() {
    this.mountChart();
  }

  mountChart() {
    const ctx: any = this.$refs.chart;
    this.chart?.destroy();
    this.chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Community Pharm", "Unfulfilled request", "Internal Pharm"],
        datasets: [
          {
            data: [68, 16, 16],
            backgroundColor: ["#F7B538", "#35BA83", "#114FF5"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              boxWidth: 7,
              boxHeight: 7,
              pointStyle: "circle",
              usePointStyle: true,
            },
          },
          title: {
            display: false,
          },
        },
      },
    });
  }
}
</script>
