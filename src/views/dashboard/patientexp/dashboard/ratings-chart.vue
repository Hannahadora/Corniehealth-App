<template>
  <chart-card height="402px" title="Overall Ratings" :subtitle="totalRate">
    <div class="w-full grid rating-grid">
      <span class="block p-3">
        <canvas id="rating-chart" style="margin: auto"></canvas>
      </span>
      <div class="w-full flex flex-col">
        <rating-bar
          :percent="52"
          background="#35BA83"
          total="1,820"
          :title="require('@/assets/5star.png')"
        />
        <rating-bar
          :percent="8"
          class="mt-3"
          background="#F7B538"
          total="170"
          :title="require('@/assets/4star.png')"
        />
        <rating-bar
          :percent="14"
          class="mt-3"
          background="#114FF5"
          total="420"
          :title="require('@/assets/3star.png')"
        />
        <rating-bar
          :percent="12"
          class="mt-3"
          background="#FE4D3C"
          total="280"
          :title="require('@/assets/2star.png')"
        />
        <rating-bar
          :percent="22"
          class="mt-3"
          background="#541388"
          total="490"
          :title="require('@/assets/staricon.png')"
        />
      </div>
    </div>
  </chart-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChartCard from "./chart-card.vue";
import { Chart } from "chart.js";
import { CustomDoughnutController } from "@/plugins/chart";
import ProgressBar from "@/components/progress-bar.vue";
import RatingBar from "./rating-bar.vue";

Chart.register(CustomDoughnutController);

@Options({
  name: "RatingChart",
  components: {
    ChartCard,
    ProgressBar,
    RatingBar,
  },
})
export default class RatingChart extends Vue {
  chart!: Chart;
  starIcon = require("@/assets/staricon.png");

  get totalRate() {
    return "4.56/5.0";
  }

  mounted() {
    this.mountChart();
  }

  mountChart() {
    const data = {
      labels: ["5 Star", "4 Star", "3 Star", "2 Star", "1 Star"],
      datasets: [
        {
          backgroundColor: [
            "#35BA83",
            "#541388",
            "#114FF5",
            "#FE4D3C",
            "#F7B538",
          ],
          data: [52, 22, 14, 12, 8],
        },
      ],
    };
    const ctx: any = document.getElementById("rating-chart");
    this.chart?.destroy();
    this.chart = new Chart(ctx, {
      type: "derivedDoughnut",
      data,
      options: {
        cutout: "70%",
        maintainAspectRatio: false,
        elements: {
          center: {
            text: "4.56/5.0",
            color: "#14171F",
            fontStyle: "Inter",
            sidePadding: 12,
            minFontSize: 12,
            lineHeight: 25,
          },
        },
        responsive: true,
        plugins: {
          //  legend: {
          //     position: "right",
          //     labels: {
          //       boxWidth: 10,
          //       boxHeight: 10,
          //       pointStyle: "circle",
          //       usePointStyle: true,
          //     },
          //   },
          legend: {
            display: false,
          },
          title: {
            display: false,
          },
        },
      },
    });
    if (this.chart && this.chart.canvas.parentNode) {
      const parent: any = this.chart.canvas.parentNode;
      parent.style.height = "200px";
    }
  }
}
</script>
<style scoped>
.rating-grid {
  grid-template-columns: 30% 70%;
}
</style>
