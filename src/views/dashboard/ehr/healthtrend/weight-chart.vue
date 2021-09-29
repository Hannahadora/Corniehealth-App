<template>
  <chart-card height="343px" title="Weight">
     <p class="text-primary font-bold text-sm -mt-5 mb-3">115.97<span class="font-light">kg</span></p>
    <canvas ref="chart"></canvas>
  </chart-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChartCard from "./chart-card.vue";
import Chart from "chart.js/auto";

@Options({
  name: "BloodChart",
  components: {
    ChartCard,
  },
})
export default class WeightChart extends Vue {
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
          {  
             fill: {
                target: 'origin',
                above: 'rgb(219 248 230)',   // Area will be red above the origin
                below: 'rgb(12 104 47)'    // And blue below the origin
              },
            data: [50, 100, 20, 55, 220, 100],
            borderColor: "rgba(53, 186, 131, 1)",
            borderWidth: 1,
            tension: 0,
            pointRadius: 0,
            backgroundColor: ""
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
        display: false
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
