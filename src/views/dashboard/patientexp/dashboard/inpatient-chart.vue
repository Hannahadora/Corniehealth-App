<template>
  <div
    class=""
  >
    <chart-card
    height="422px"
    title="Inpatient"
    subtitle="16 Inpatients"
    action="View Inpatients"
  >
    <canvas ref="chart" style="margin: auto"></canvas>
  </chart-card>
      <!-- <canvas
        ref="inpatient_chart"
        style="margin: auto;"
      ></canvas> -->
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChartCard from "./chart-card.vue";
import Chart from "chart.js/auto";
import DropDown from "@/components/drop-down.vue";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";

@Options({
  name: "InPatientChart",
  components: {
    ChartCard,
    DropDown,
    ChevronDownIcon,
  },
})
export default class InPatientChart extends Vue {
  order: "Today" | "WTD" | "MTD" | "YTD" = "WTD";
  filter = false;

  chart!: Chart;

  mounted() {
    this.mountChart();
  }

  mountChart() {
    const data = {
      labels: ["4 New", "12 Old"],
      datasets: [
        {
          label: "Dataset 1",
          backgroundColor: ["#114FF5", "#35BA83"],
          data: [4, 12],
        },
      ],
    };
    const ctx: any = this.$refs.chart;
    this.chart?.destroy();
    this.chart = new Chart(ctx, {
      type: "pie",
      data,
      options: {
      backgroundColor: "#000",
        elements: {
          center: {
            // text: "80 Patients appointments",
            color: "#14171F",
            fontStyle: "Inter",
            sidePadding: 12,
            minFontSize: 12,
            lineHeight: 25,
          },
        },
        // cutout: "0%",
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
