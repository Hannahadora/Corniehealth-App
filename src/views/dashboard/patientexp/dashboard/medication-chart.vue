<template>
  <chart-card height="422px" title="Medication Rx" action="View Rx">
    <canvas ref="chart" style="margin: auto"></canvas>
  </chart-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChartCard from "./chart-card.vue";
import { Chart } from "chart.js";
import { cornieClient } from "@/plugins/http";
import IStat from "@/types/IStat";
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
    internalPharmacy: 0,
    communityPharmacy: 0,
  };

  @Watch("count", { deep: true })
  countChanged() {
    this.mountChart();
  }

  get url() {
    const location = this.context.locationId;
    const admin = this.context.admin ? "admin/" : "";
    return `/api/v1/experience-dashboard/${admin}count-medications/${location}`;
  }

  async fetchData() {
    try {
      const { data } = await cornieClient().get(this.url, {
        start: this.context.start,
        end: this.context.end,
      });

      this.count = data;
    } catch (error) {
      window.notify({ msg: "Failed to count medications", status: "error" });
    }
  }

  mounted() {
    this.mountChart();
  }

  get total() {
    const { internalPharmacy, communityPharmacy } = this.count;
    return internalPharmacy + communityPharmacy;
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
    const { communityPharmacy, internalPharmacy } = this.count;

    return {
      labels: ["Internal Pharmacy", "Community Pharmacy"],
      datasets: [
        {
          backgroundColor: ["#F7B538", "#541388"],
          data: [communityPharmacy, internalPharmacy],
        },
      ],
    };
  }

  mountChart() {
    const data = this.total < 1 ? this.emptyChartData : this.chartData;
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
