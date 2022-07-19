<template>
  <chart-card height="422px" title="Diagnostic Requests" action="View Requests">
    <canvas ref="chart" style="margin: auto"></canvas>
  </chart-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChartCard from "./chart-card.vue";
import { Chart } from "chart.js";
import { cornieClient } from "@/plugins/http";
import { Prop, Watch } from "vue-property-decorator";
import { ChartContext } from "./types";

@Options({
  name: "MedicationChart",
  components: {
    ChartCard,
  },
})
export default class MedicationChart extends Vue {
  chart!: Chart;

  @Prop({ type: Object, required: true })
  context!: ChartContext;

  count = {
    internalLaboratory: 0,
    communityLaboratory: 0,
  };

  @Watch("count", { deep: true })
  countChanged() {
    this.mountChart();
  }

  get url() {
    const location = this.context.locationId;
    const admin = this.context.admin ? "admin/" : "";
    return `/api/v1/experience-dashboard/${admin}count-diagnostics/${location}`;
  }

  async fetchData() {
    try {
      const { data } = await cornieClient().get(this.url, {
        start: this.context.start,
        end: this.context.end,
      });

      this.count = data;
    } catch (error) {
      window.notify({ msg: "Failed to count diagnostics", status: "error" });
    }
  }

  mounted() {
    this.mountChart();
  }

  get total() {
    const { internalLaboratory, communityLaboratory } = this.count;
    return internalLaboratory + communityLaboratory;
  }

  get emptyChartData() {
    return {
      labels: [""],
      datasets: [
        {
          backgroundColor: ["#C2C7D6"],
          data: [1, 0, 0],
        },
      ],
    };
  }

  get chartData() {
    const { internalLaboratory, communityLaboratory } = this.count;

    return {
      labels: ["Internal Laboratory", "Community Laboratory"],
      datasets: [
        {
          backgroundColor: ["#35BA83", "#114FF5"],
          data: [communityLaboratory, internalLaboratory],
        },
      ],
    };
  }

  mountChart() {
    const data = this.total > 0 ? this.chartData : this.emptyChartData;

    const ctx: any = this.$refs.chart;
    this.chart?.destroy();
    this.chart = new Chart(ctx, {
      type: "pie",
      data,
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
