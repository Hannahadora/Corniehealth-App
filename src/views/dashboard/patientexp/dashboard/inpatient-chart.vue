<template>
  <div
    class="
      flex-col
      justify-center
      bg-white
      shadow-md
      p-3
      mt-2
      mb-2
      rounded
      w-full
    "
  >
    <div class="block w-full">
      <div class="flex justify-between w-full">
        <span class="flex items-center">
          <h2 class="font-bold">In-Patient</h2>
          <div class="flex items-center">
            <span class="mx-2">{{ order }}</span>
            <chevron-down-icon
              @click="filter = !filter"
              class="stroke-current cursor-pointer text-danger"
            />
            <drop-down v-model="filter">
              <div class="flex flex-col">
                <span class="cursor-pointer" @click="order = 'Today'"
                  >Today</span
                >
                <span class="cursor-pointer" @click="order = 'WTD'">WTD</span>
                <span class="cursor-pointer" @click="order = 'MTD'">MTD</span>
                <span class="cursor-pointer" @click="order = 'YTD'">YTD</span>
              </div>
            </drop-down>
          </div>
        </span>
        <span> Total=140 </span>
      </div>
      <canvas ref="inpatient_chart" style="margin: auto; margin-top: -30px;"></canvas>
    </div>
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
    const ctx: any = this.$refs.inpatient_chart;
    ctx.height = 75;
    this.chart?.destroy();
    this.chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00"],
        datasets: [
          {
            fill: {
              target: "origin",
              below: "rgb(0, 0, 255)",
            },
            label: "New",
            data: [50, 150, 100, 400, 0],
            borderColor: "rgba(17, 79, 245, 1)",
            borderWidth: 2,
            tension: 0.1,
          },
          {
            fill: {
              target: "origin",
              below: "rgb(0, 0, 255)",
            },
            label: "Old",
            data: [0, 50, 150, 100, 400, 0],
            borderColor: "#F7B538",
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
              boxWidth: 7,
              boxHeight: 7,
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
