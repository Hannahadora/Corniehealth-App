<template>
  <chart-card height="422px" title="Referral" subtitle="18 Referrals" action="View Referrals">
    <canvas ref="chart" style="margin: auto"></canvas>
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
      labels: ["15 Incoming", "3 Outgoing"],
      datasets: [
        {
          label: "Dataset 1",
          backgroundColor: ["#35BA83", "#F7B538"],
          data: [15, 3],
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
            text: "18 Referrals",
            color: "#14171F",
            fontStyle: "Inter",
            sidePadding: 12,
            minFontSize: 12,
            lineHeight: 25,
          },
        },
        cutout: "80%",
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
