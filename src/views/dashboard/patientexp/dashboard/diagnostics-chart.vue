<template>
  <chart-card height="390px" title="Diagnostic">
    <canvas ref="chart" style="margin: auto"></canvas>
  </chart-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChartCard from "./chart-card.vue";
import { Chart } from "chart.js";
import { cornieClient } from "@/plugins/http";
import IStat from "@/types/IStat";
import { groupData } from "./chart/chart-filter";
import { Prop, Watch } from "vue-property-decorator";

@Options({
  name: "MedicationChart",
  components: {
    ChartCard,
  },
})
export default class MedicationChart extends Vue {
  chart!: Chart;

  order: "Today" | "WTD" | "MTD" | "YTD" = "WTD";

  get chartData() {
    //const data = groupData(this.raw, this.order);
    const data = this.rawDataActive;
    const data2 = this.rawDatatotalRequest;
    const data3 = this.rawDataCanceled;
    return { data, data2, data3 };
  }

  raw: IStat[] = [];
  rawDataActive = 0;
  rawDatatotalRequest = 0;
  rawDataCanceled = 0;

  async fetchData() {
    try {
      const response = await cornieClient().get(
        "api/v1/requests/getStats/count"
      );
      ;
      const rawActive = response.data.Active;
      this.rawDataActive = rawActive;
      this.rawDatatotalRequest = response.data.totalRequest;
      this.rawDataCanceled = response.data.Cancelled;
      this.chartData; //this line just  gets the vuejs reactivity system to refresh
    } catch (error) {
      window.notify({ msg: "Failed to fetch chart data", status: "error" });
    }
  }

  @Watch("chartData")
  chartUpdated() {
    this.mountChart();
  }
  mounted() {
    this.mountChart();
  }

  mountChart() {
    const ctx: any = this.$refs.chart;
    this.chart?.destroy();
    this.chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Community pharm", "Internal pharmcy", "laboratory"],
        datasets: [
          {
            data: [30, 20, 40],
            backgroundColor: ["#114FF5", "#35BA83", "#541388"],
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
  created() {
    this.fetchData();
  }
}
</script>
