<template>
  <div class="block w-full">
    <div>
      <div class="my-6">
        <span class="flex items-center justify-between">
          <h2 class="font-bold text-base" style="coolor: #667499">
            Patient Registration Chart
          </h2>
          <span
            class="mx-2 text-sm font-semibold cursor-pointer"
            style="color: #fe4d3c"
            >View Patients</span
          >
        </span>
        <div v-if="!restricted" class="flex items-center">
          <span class="text-2xl font-bold mr-2"></span>
          <span class="text-base font-bold text-green-400"></span>
        </div>
      </div>
      <canvas v-if="!restricted" ref="registration_chart"></canvas>
    </div>
    <div
      class="flex flex-col items-center justify-center"
      style="height: 391px"
      v-if="restricted"
    >
      <div class="text-center">
        <p class="font-bold text-2xl text-purple-800 mb-2">Restricted Data</p>
        <p class="text-base">You are not authorized to view this data</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import DropDown from "@/components/drop-down.vue";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import { cornieClient } from "@/plugins/http";
import IStat from "@/types/IStat";
import Chart from "chart.js/auto";
import { Options, Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import ChartCard from "../dashboard/chart-card.vue";
import { groupData } from "./chart-filter";

@Options({
  name: "RegistrationChart",
  components: {
    ChevronDownIcon,
    DropDown,
    ChartCard,
  },
})
export default class RegistrationChart extends Vue {
  filter = false;

  order: "Today" | "WTD" | "MTD" | "YTD" = "WTD";

  chart!: Chart;

  @Prop({ type: Number, default: 70 })
  height!: number;

  get chartData() {
    const data = groupData(this.raw, this.order);
    return data;
  }

  raw: IStat[] = [];

  restricted = false;

  reorder(order: "Today" | "WTD" | "MTD" | "YTD") {
    this.order = order;
    this.filter = false;
  }

  async fetchData() {
    try {
      const response = await cornieClient().get(
        "api/v1/patient/analytics/stats"
      );
      this.raw = response.data;
      if (response.data == "You are not allowed to access this resource") {
        this.restricted = true;
      }
      this.chartData; //this line just  gets the vuejs reactivity system to refresh
    } catch (error) {
      window.notify({ msg: "Failed to fetch chart data", status: "error" });
    }
  }
  created() {
    this.fetchData();
  }

  @Watch("chartData")
  chartUpdated() {
    this.mountChart();
  }

  mounted() {
    this.mountChart();
  }

  mountChart() {
    const ctx: any = this.$refs.registration_chart;
    ctx.height = this.height;
    this.chart?.destroy();
    this.chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: this.chartData.labels,
        datasets: [
          {
            fill: {
              target: "origin",
              below: "rgb(0, 0, 255)",
            },
            label: "Patient Registration Stat",
            data: this.chartData.dataSet,
            borderColor: "rgba(17, 79, 245, 1)",
            borderWidth: 2,
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: true,
            },
          },
        },
        plugins: {
          legend: {
            position: "bottom",
            align: "start",
            labels: {
              boxWidth: 5,
              boxHeight: 5,
              pointStyle: "circle",
              usePointStyle: true,
            },
          },
          tooltip: {
            backgroundColor: "rgba(8, 0, 86, 1)",
            titleAlign: "center",
            titleMarginBottom: 9,
            bodyAlign: "center",
            padding: 30,
            position: "average",
            yAlign: "bottom",
          },
        },
      },
    });
  }
}
</script>
