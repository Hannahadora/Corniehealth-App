<template>
  <chart-card height="390px" title="Billings and Payments">
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
  name: "BillingsChart",
  components: {
    ChartCard,
  },
})
export default class BillingsChart extends Vue {
  chart!: Chart;
  mounted() {
    this.mountChart();
  }

  mountChart() {
    const data = {
      labels: ["New billing", "Old bill"],
      datasets: [
        {
          label: "Dataset 1",
          backgroundColor: ["#541388", "#F0F4FE"],
          data: [80, 20],
        },
      ],
    };
    const ctx: any = this.$refs.chart;
    this.chart?.destroy();
    this.chart = new Chart(ctx, {
      type: "derivedDoughnut",
      data,
      options: {
        // cutout: 90,
        elements: {
          center: {
            text: "N800, 000",
            color: "#14171F",
            fontStyle: "Arial",
            sidePadding: 12,
            minFontSize: 12,
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
