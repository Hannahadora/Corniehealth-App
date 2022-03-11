<template>
  <div class="grid grid-cols-3 gap-8">
    <chart-card
      height="422px"
      title="Appointments"
      subtitle="80 Appointments"
      action="View appointment"
    >
      <canvas ref="chart" style="margin: auto" class="mt-8 mb-11"></canvas>
    </chart-card>

  <div class="col-span-2">
      <chart-card
      height="422px"
      title="Today's Appointments"
      action="View appointment"
    >
      <div class="w-full flex flex-col overflow-y-scroll">
        <div
          class="w-full flex items-center mb-4"
          v-for="(appointment, index) in appointments"
          :key="index"
        >
          <span class="text-lg" style="color: #667499;">{{ appointment.time }}</span>
          <div class="w-11/12 p-4 ml-8 flex items-center hover:bg-blue-100">
            <img
              class="w-12 h-12 mr-4 rounded-full"
              :src="appointment.pImage"
              alt=""
            />
            <span class="w-10/12 mr-4">{{ appointment.pName }}</span>
            <!-- <img src="@/assets/icon (2).png" alt="" /> -->
          </div>
        </div>
      </div>
    </chart-card>
  </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChartCard from "./chart-card.vue";
import { Chart, DoughnutController } from "chart.js";
import { CustomDoughnutController } from "@/plugins/chart";

Chart.register(CustomDoughnutController);

@Options({
  name: "AppointmentChart",
  components: {
    ChartCard,
  },
})
export default class AppointmentChart extends Vue {
  chart!: Chart;
  appointments: Array<any> = [
    {
      time: "10:30",
      pImage: "@/assets/avatar (1).png",
      pName: "Oluwafunmilayo Adeola Sarah",
    },
    {
      time: "13:45",
      pImage: "@/assets/avatar (2).png",
      pName: "Busayo Akindele Deborah",
    },
    {
      time: "16:30",
      pImage: "@/assets/avatar (3).png",
      pName: "Group Meeting",
    },
  ];
  mounted() {
    this.mountChart();
  }

  mountChart() {
    const data = {
      labels: ["52 New", "18 Follow Ups", "10 Referrals"],
      datasets: [
        {
          label: "Dataset 1",
          backgroundColor: ["#114FF5", "#FE4D3C", "#35BA83"],
          data: [52, 18, 10],
        },
      ],
    };
    const ctx: any = this.$refs.chart;
    this.chart?.destroy();
    this.chart = new Chart(ctx, {
      type: "derivedDoughnut",
      data,
      options: {
        elements: {
          center: {
            text: "80 Patients appointments",
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
