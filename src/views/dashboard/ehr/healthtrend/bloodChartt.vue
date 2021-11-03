<template>
  <chart-card height="338px" title="Blood Pressure">
    <p class="text-primary font-bold text-sm -mt-5 mb-3">120/90 <span class="font-light">mmHgz</span></p>
    <canvas ref="chart"></canvas>
  </chart-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChartCard from "./chart-card.vue";
import Chart from "chart.js/auto";
@Options({
  name: "BloodChartt",
  components: {
    ChartCard,
  },
})
export default class BloodChartt extends Vue {
  chart!: Chart;
  mounted() {
    this.mountChart();
  }
  mountChart() {
    const ctx: any = this.$refs.chart;
    ctx.height = 95;
    this.chart?.destroy();
    this.chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["01-Jan", "02-Jan", "03-Jan", "11:00", "04-Jan"],
        datasets: [
          // {
          //   label: "Upper band",
          //   data: [0, 50, 50, 48, 220, 180],
          //   borderColor: "rgba(17, 79, 245, 1)",
          //   borderWidth: 1.5,
          //   tension: 0.3,
          //     pointRadius: 0,
          //        backgroundColor:"rgba(17, 79, 245, 1)"
          // },
          // {
            
          //   label: "Lower band",
          //   data: [45, 0, 50, 200, 150, 200],
          //   borderColor: "rgba(254, 77, 60, 1)",
          //   borderWidth: 1.5,
          //   tension: 0.3,
          //     pointRadius: 0,
          //      backgroundColor:"rgba(254, 77, 60, 1)"
          // },
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
              display: false,
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