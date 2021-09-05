<template>
  <div class="block w-full">
    <div class="flex justify-between w-full">
      <span class="flex items-center">
        <h2 class="font-bold">Patient Registration Chart</h2>
        <div class="flex items-center">
          <span class="mx-2">{{ order }}</span>
          <chevron-down-icon
            @click="filter = !filter"
            class="stroke-current cursor-pointer text-danger"
          />
          <drop-down v-model="filter">
            <div class="flex flex-col">
              <span class="cursor-pointer" @click="order = 'Today'">Today</span>
              <span class="cursor-pointer" @click="order = 'WTD'">WTD</span>
              <span class="cursor-pointer" @click="order = 'MTD'">MTD</span>
              <span class="cursor-pointer" @click="order = 'YTD'">YTD</span>
            </div>
          </drop-down>
        </div>
      </span>
      <span> Total={{ chartData.total }} </span>
    </div>
    <canvas ref="registration_chart"></canvas>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Chart from "chart.js/auto";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import DropDown from "@/components/drop-down.vue";
import { cornieClient } from "@/plugins/http";
import IStat from "@/types/IStat";
import { groupData } from "./chart-filter";
import { Watch } from "vue-property-decorator";

@Options({
  name: "RegistrationChart",
  components: {
    ChevronDownIcon,
    DropDown,
  },
})
export default class RegistrationChart extends Vue {
  filter = false;

  order: "Today" | "WTD" | "MTD" | "YTD" = "WTD";

  chart!: Chart;

  get chartData() {
    const data = groupData(this.raw, this.order);
    return data;
  }

  raw: IStat[] = [];

  async fetchData() {
    try {
      const response = await cornieClient().get("api/v1/patient/stats");
      this.raw = response.data;
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
    ctx.height = 50;
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
