<template>
  <chart-card height="439px" title="Referral">
    <canvas ref="chart"></canvas>
  </chart-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChartCard from "./chart-card.vue";
import { Chart } from "chart.js";
import { CustomDoughnutController } from "@/plugins/chart";

Chart.register(CustomDoughnutController);

@Options({
  name: "ReferralChart",
  components: {
    ChartCard,
  },
})
export default class ReferralChart extends Vue {
  chart!: Chart;
  mounted() {
    this.mountChart();
  }

  mountChart() {
    const data = {
      labels: ["Incoming", "Outgoing"],
      datasets: [
        {
          label: "Dataset 1",
          backgroundColor: ["#F0F4FE", "#00D5E0"],
          data: [4, 12],
        },
      ],
    };
    const ctx: any = this.$refs.chart;
    this.chart?.destroy();
    this.chart = new Chart(ctx, {
      type: "derivedDoughnut",
      data,
      options: {
        cutout: 90,
        elements: {
          center: {
            text: "18 REFERRALS",
            color: "#14171F",
            fontStyle: "Arial",
            sidePadding: 12,
            minFontSize: 20,
            lineHeight: 25,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
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
