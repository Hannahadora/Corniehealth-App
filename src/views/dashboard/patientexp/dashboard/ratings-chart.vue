<template>
  <chart-card height="450px" title="Rating">
    <div class="w-full grid rating-grid">
      <span class="block p-3">
        <canvas id="rating-chart" style="margin: auto"></canvas>
      </span>
      <div class="w-full mt-5 flex flex-col">
        <rating-bar :percent="12" color="warning" title="Neutral Responses" />
        <rating-bar
          :percent="30"
          class="mt-3"
          color="danger"
          subtitle="(+3 IN THE LAST 30 DAYS)"
          title="Negative Responses"
        />
        <rating-bar
          :percent="58"
          class="mt-3"
          color="success"
          subtitle="(14 RATINGS)"
          title="Positive Responses"
        />
        <span class="mt-16 block">
          <hr class="w-full border" />
          <span class="w-full flex justify-between">
            <div class="mt-3 flex items-center border-r-2 pr-3">
              <span class="font-bold text-success">5</span>
              <span class="ml-1 font-semibold text-sm text-black">
                Very Satisfied
              </span>
            </div>
            <div class="mt-3 flex items-center border-r-2 pr-3">
              <span class="font-bold text-success">2</span>
              <span class="ml-1 font-semibold text-sm text-black">
                Satisfied
              </span>
            </div>
            <div class="mt-3 flex items-center border-r-2 pr-3">
              <span class="font-bold text-success">4</span>
              <span class="ml-1 font-semibold text-sm text-black">
                Average
              </span>
            </div>
            <div class="mt-3 flex items-center border-r-2 pr-3">
              <span class="font-bold text-success">3</span>
              <span class="ml-1 font-semibold text-sm text-black">
                Satisfied
              </span>
            </div>
            <div class="mt-3 flex items-center pr-3">
              <span class="font-bold text-success">0</span>
              <span class="ml-1 font-semibold text-sm text-black">
                Very Dissatisfied
              </span>
            </div>
          </span>
        </span>
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
    this.chart?.destroy();
    this.chart = new Chart(ctx, {
      type: "derivedDoughnut",
      data,
      options: {
        // cutout: "70%",
        maintainAspectRatio: false,
        elements: {
          center: {
            text: "4.1/5 Average",
            color: "#14171F",
            fontStyle: "Arial",
            sidePadding: 12,
            minFontSize: 12,
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
    if (this.chart && this.chart.canvas.parentNode) {
      const parent: any = this.chart.canvas.parentNode;
      parent.style.height = "390px";
    }
  }
}
</script>
<style scoped>
.rating-grid {
  grid-template-columns: 40% 55%;
}
</style>
