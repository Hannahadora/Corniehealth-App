<template>
  <chart-card
    height="422px"
    title="Appointments"
    :subtitle="`${totalAppointment} Appointments`"
    action="View appointment"
    @more="$router.push('/dashboard/provider/experience/calendar')"
  >
    <canvas ref="chart" style="margin: auto" class="mt-8 mb-11"></canvas>
  </chart-card>
</template>
<script lang="ts">
  import { CustomDoughnutController } from "@/plugins/chart";
  import { cornieClient } from "@/plugins/http";
  import { Chart } from "chart.js";
  import { Options, Vue } from "vue-class-component";
  import { Prop, Watch } from "vue-property-decorator";
  import ChartCard from "./chart-card.vue";
  import { ChartContext } from "./types";

  Chart.register(CustomDoughnutController);

  interface AppointmentCount {
    new: number;
    totalAppointment: number;
    followUps: number;
    referrals: number;
  }
  @Options({
    name: "AppointmentChart",
    components: {
      ChartCard,
    },
  })
  export default class AppointmentChart extends Vue {
    chart!: Chart;

    @Prop({ type: Object, required: true })
    context!: ChartContext;

    count = {
      new: 0,
      followUps: 0,
      referrals: 0,
    } as AppointmentCount;

    mounted() {
      this.mountChart();
    }

    get totalAppointment() {
      return this.count.new + this.count.followUps + this.count.referrals;
    }

    @Watch("context", { deep: true })
    contextChanged() {
      this.fetchChart();
    }

    get url() {
      const location = this.context.locationId;
      const admin = this.context.admin ? "admin/" : "";
      return `/api/v1/experience-dashboard/${admin}count-appointments/${location}`;
    }

    async fetchChart() {
      try {
        const { data } = await cornieClient().get(this.url, {
          start: this.context.start,
          end: this.context.end,
        });
        this.count = data;
      } catch (error) {
        window.notify({ msg: "Failed to count appointments", status: "error" });
      }
    }

    created() {
      this.fetchChart();
    }

    get labels() {
      return [
        `${this.count.new} New`,
        `${this.count.followUps} Follow Ups`,
        `${this.count.referrals} Referrals`,
      ];
    }

    @Watch("count", { deep: true })
    countChanged() {
      this.mountChart();
    }

    get chartText() {
      return `${this.totalAppointment} Patient Appointments`;
    }

    get empty() {
      return this.totalAppointment < 1;
    }

    get chartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: "Dataset 1",
            backgroundColor: ["#114FF5", "#FE4D3C", "#35BA83"],
            data: [this.count.new, this.count.followUps, this.count.referrals],
          },
        ],
      };
    }

    get emptyChartData() {
      return {
        labels: ["", ...this.labels],
        datasets: [
          {
            label: "Dataset 1",
            backgroundColor: ["#C2C7D6", "#114FF5", "#FE4D3C", "#35BA83"],
            data: [1, 0, 0, 0],
          },
        ],
      };
    }

    mountChart() {
      const data = this.empty ? this.emptyChartData : this.chartData;
      const ctx: any = this.$refs.chart;
      this.chart?.destroy();
      this.chart = new Chart(ctx, {
        type: "derivedDoughnut",
        data,
        options: {
          elements: {
            center: {
              text: this.chartText,
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
