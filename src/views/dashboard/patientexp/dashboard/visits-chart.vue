<template>
  <chart-card
    height="422px"
    title="Active Visits"
    :subtitle="`${total} Visits`"
    action="View Visits"
  >
    <canvas ref="chart" style="margin: auto"></canvas>
  </chart-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChartCard from "./chart-card.vue";
import Chart from "chart.js/auto";
import { cornieClient } from "@/plugins/http";
import { Prop, Watch } from "vue-property-decorator";
import { ChartContext } from "./types";

@Options({
  name: "VisitsChart",
  components: {
    ChartCard,
  },
})
export default class VisitsChart extends Vue {
  chart!: Chart;

  @Prop({ type: Object, required: true })
  context!: ChartContext;

  count = {
    checkedIn: 0,
    checkedOut: 0,
  };

  @Watch("count", { deep: true })
  countChanged() {
    this.mountChart();
  }

  get url() {
    const location = this.context.locationId;
    const admin = this.context.admin ? "admin/" : "";
    return `/api/v1/experience-dashboard/${admin}count-visits/${location}`;
  }

  async fetchChart() {
    try {
      const { data } = await cornieClient().get(this.url, {
        start: this.context.start,
        end: this.context.end,
      });

      this.count = data;
    } catch (error) {
      window.notify({ msg: "Failed to count visits", status: "error" });
    }
  }

  mounted() {
    this.mountChart();
  }

  created() {
    this.fetchChart();
  }

  get total() {
    const { checkedIn, checkedOut } = this.count;
    return checkedIn + checkedOut;
  }
  get emptyChartData() {
    return {
      labels: ["Completed", "Queued"],
      datasets: [
        {
          label: "Dataset 1",
          backgroundColor: ["#C2C7D6", "#F7B538", "#541388"],
          data: [1, 0, 0],
        },
      ],
    };
  }

  get chartData() {
    const { checkedIn, checkedOut } = this.count;

    return {
      labels: ["Completed", "Queued"],
      datasets: [
        {
          label: "Dataset 1",
          backgroundColor: ["#F7B538", "#541388"],
          data: [checkedOut, checkedIn],
        },
      ],
    };
  }

  mountChart() {
    const data = this.total > 0 ? this.chartData : this.emptyChartData;

    const ctx: any = this.$refs.chart;
    this.chart?.destroy();
    this.chart = new Chart(ctx, {
      type: "derivedDoughnut",
      data,
      options: {
        elements: {
          center: {
            text: `${this.total} Active Visits`,
            color: "#14171F",
            fontStyle: "Arial",
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
