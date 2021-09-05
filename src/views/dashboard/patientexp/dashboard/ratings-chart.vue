<template>
  <chart-card height="439px" title="Rating">
    <div class="w-full grid grid-cols-3">
      <span class="block p-7">
        <canvas id="rating-chart"></canvas>
      </span>
    </div>
  </chart-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChartCard from "./chart-card.vue";
import { Chart } from "chart.js";
import { CustomDoughnutController } from "@/plugins/chart";

Chart.register(CustomDoughnutController);

@Options({
  name: "RatingChart",
  components: {
    ChartCard,
  },
})
export default class RatingChart extends Vue {
  chart!: Chart;
  mounted() {
    this.mountChart();
  }

  mountChart() {
    const data = {
      labels: ["Positive", "Others"],
      datasets: [
        {
          backgroundColor: ["#35BA83", "#F0F4FE"],
          data: [4, 1],
        },
      ],
    };
    const ctx: any = document.getElementById("rating-chart");
    ctx.height = 150;
    this.chart?.destroy();
    this.chart = new Chart(ctx, {
      type: "derivedDoughnut",
      data,
      options: {
        cutout: "70%",
        elements: {
          center: {
            text: "4.1/5 Average",
            color: "#14171F",
            fontStyle: "Arial",
            sidePadding: 12,
            minFontSize: 20,
            lineHeight: 25,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            display: false,
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
<style scoped>
.rating-grid {
  grid-template-columns: 40% 55%;
}
</style>
