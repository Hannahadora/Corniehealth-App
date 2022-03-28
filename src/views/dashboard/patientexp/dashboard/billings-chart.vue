<template>
  <chart-card
    height="474px"
    title="Account Receivables"
    :subtitle="totalBillings"
    action="View Billing"
  >
    <div class="w-full grid rating-grid mt-8">
      <div class="w200">
        <canvas ref="chart" style="margin: auto;"></canvas>
      </div>

      <div class="w-">
        <table class="w-full">
          <tbody>
            <tr>
              <td>Reliance HMO</td>
              <td>₦ 2,050,000.00</td>
            </tr>
            <tr>
              <td>AIICO</td>
              <td>₦ 2,412,000.00</td>
            </tr>
            <tr>
              <td>Avon</td>
              <td>₦ 3,345,000.00</td>
            </tr>
            <tr>
              <td>AXA Mansard</td>
              <td>₦ 3,112,893.00</td>
            </tr>
            <tr>
              <td>Others</td>
              <td>₦ 754,112.00</td>
            </tr>
          </tbody>
        </table>
      </div>
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
  name: "BillingsChart",
  components: {
    ChartCard,
  },
})
export default class BillingsChart extends Vue {
  chart!: Chart;

  get totalBillings() {
    return "₦ 17,782,000.00";
  }

  mounted() {
    this.mountChart();
  }

  mountChart() {
    const data = {
      labels: ["Claims (₦ 11,202,660.00)", "Self-pay (₦ 6,579,340.00)"],
      datasets: [
        {
          label: "Dataset 1",
          backgroundColor: ["#114FF5", "#35BA83"],
          data: [63, 37],
        },
      ],
    };
    const ctx: any = this.$refs.chart;
    this.chart?.destroy();
    this.chart = new Chart(ctx, {
      type: "pie",
      data,
      options: {
        // cutout: 90,
        elements: {
          center: {
            text: "N800, 000",
            color: "#14171F",
            fontStyle: "Inter",
            sidePadding: 12,
            minFontSize: 12,
            lineHeight: 25,
          },
        },
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
.w200 {
  width: 200px !;
  height: 200px;
}
td {
  font-size: 14px !important;
  padding: 14px 16px !important;
  line-height: 20px;
  color: #14171f;
}
table > tbody > tr > td:last-child {
  display: flex;
  flex-direction: row;
  justify-content: flex-end !important;
}
table > tbody > tr:nth-of-type(even) {
  background: #f0f4fe !important;
  border-radius: 8px;
}
table,
tbody,
tr {
  border: none !important;
}
</style>
