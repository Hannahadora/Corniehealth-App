<template>
  <chart-card height="439px" title="Active Visits">
    <canvas ref="chart"></canvas>
  </chart-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChartCard from "./chart-card.vue";
import Chart from "chart.js/auto";
import { cornieClient } from "@/plugins/http";

@Options({
  name: "VisitsChart",
  components: {
    ChartCard,
  },
})
export default class VisitsChart extends Vue {
  chart!: Chart;

   date = new Date();
   chartData: number[] = [ ]

  async getChartData(start: Date, end: Date) {
    try {
      const { data } = await cornieClient().get(`/api/v1/visit/analytics/stats`, { start: start?.toISOString(), end: end?.toISOString()})
      console.log(data, "VISITS CHART");
      // this.chartData = data.
    } catch (error) {
      console.log(error);
      
    }
  }

  mounted() {
    this.mountChart();
  }

  mountChart() {
    const data = {
      labels: ["Completed", "Queued"],
      datasets: [
        {
          label: "Dataset 1",
          backgroundColor: ["#F7B538", "#541388", "#35BA83", "#114FF5"],
          data: [2, 5],
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
            text: "80 Acive Visits",
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

  async created() {
    const startDate = new Date(new Date().setDate(new Date().getDate() - 365))
    await this.getChartData(startDate, this.date)
  }
}
</script>
