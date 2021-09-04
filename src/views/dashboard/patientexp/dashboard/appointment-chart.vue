<template>
  <chart-card height="439px" title="Appointments">
    <canvas ref="chart"></canvas>
  </chart-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChartCard from "./chart-card.vue";
import Chart from "chart.js/auto";

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
      type: "doughnut",
      data,
      options: {
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
