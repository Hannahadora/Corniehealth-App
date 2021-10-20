<template>
  <chart-card height="439px" title="">
    <h3 class="text-primary font-bold text-sm -mt-5 mb-3">Current Medications</h3>
    <canvas ref="chart"></canvas>
  </chart-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChartCard from "./chart-card.vue";
import { Chart, DoughnutController } from "chart.js";
import { CustomDoughnutController } from "@/plugins/chart";

Chart.register(CustomDoughnutController);

@Options({
  name: "AppointmentChart",
  components: {
    ChartCard,
  },
})
export default class AppointmentChart extends Vue {
  chart!: Chart;
  mounted() {
    this.mountChart();
  }

  mountChart() {
    const data = {
      labels: ["Referrals", "Confirmed", "Follow Ups", "New Patients"],
      datasets: [
        {
          label: "Dataset 1",
          backgroundColor: ["#F7B538", "#541388", "#35BA83", "#114FF5"],
          data: [2, 5, 12, 14],
        },
      ],
    };
    const ctx: any = this.$refs.chart;
    this.chart?.destroy();
    this.chart = new Chart(ctx, {
      type: "derivedDoughnut",
      data,
      options: {
        elements: {
          center: {
            text: "80 Patients appointments",
            color: "#14171F",
            fontStyle: "Arial",
            sidePadding: 12,
            minFontSize: 17,
            lineHeight: 25,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: "right",
            labels: {
              boxWidth: 10,
              boxHeight: 10,
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
