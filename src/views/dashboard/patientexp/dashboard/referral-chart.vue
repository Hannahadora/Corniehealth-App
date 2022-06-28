<template>
  <chart-card
    height="422px"
    title="Referral"
    :subtitle="`${total} Referrals`"
    action="View Referrals"
  >
    <canvas ref="chart" style="margin: auto"></canvas>
  </chart-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChartCard from "./chart-card.vue";
import { Chart } from "chart.js";
import { CustomDoughnutController } from "@/plugins/chart";
import { Prop, Watch } from "vue-property-decorator";
import { ChartContext } from "./types";
import { cornieClient } from "@/plugins/http";

Chart.register(CustomDoughnutController);

@Options({
  name: "ReferralChart",
  components: {
    ChartCard,
  },
})
export default class ReferralChart extends Vue {
  chart!: Chart;

  @Prop({ type: Object, required: true })
  context!: ChartContext;

  count = { incoming: 0, outgoing: 0 };

  get total() {
    return this.count.incoming + this.count.outgoing;
  }

  get labels() {
    const { incoming, outgoing } = this.count;
    return [`${incoming} incoming`, `${outgoing} outgoing`];
  }
  get emptyChartData() {
    return {
      labels: ["", ...this.labels],
      datasets: [
        {
          label: "Dataset 1",
          backgroundColor: ["#C2C7D6", "#35BA83", "#F7B538"],
          data: [1, 0, 0],
        },
      ],
    };
  }

  get chartData() {
    const { incoming, outgoing } = this.count;
    return {
      labels: this.labels,
      datasets: [
        {
          label: "Dataset 1",
          backgroundColor: ["#35BA83", "#F7B538"],
          data: [incoming, outgoing],
        },
      ],
    };
  }

  @Watch("count", { deep: true })
  countChanged() {
    this.mountChart();
  }

  get url() {
    const location = this.context.locationId;
    const admin = this.context.admin ? "admin/" : "";
    return `/api/v1/experience-dashboard/${admin}count-referrals/${location}`;
  }

  async fetchChart() {
    try {
      const { data } = await cornieClient().get(this.url, {
        start: this.context.start,
        end: this.context.end,
      });
      this.count = data;
    } catch (error) {
      window.notify({ msg: "Failed to count referrals", status: "error" });
    }
  }

  mountChart() {
    const data = this.total < 1 ? this.emptyChartData : this.chartData;
    const ctx: any = this.$refs.chart;
    this.chart?.destroy();
    this.chart = new Chart(ctx, {
      type: "derivedDoughnut",
      data,
      options: {
        elements: {
          center: {
            text: `${this.total} Referrals`,
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

  mounted() {
    this.mountChart();
  }

  created() {
    this.fetchChart();
  }
}
</script>
