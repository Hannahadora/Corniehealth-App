<template>
  <div class="flex flex-col space-y-16">
    <div>
      <canvas ref="chart" style="margin: auto"></canvas>
    </div>
    <div class="pt-16">
      <table class="w-full">
        <tbody>
          <tr>
            <td>Reliance HMO</td>
            <td>12%</td>
            <td>₦ 2,050,000.00</td>
          </tr>
          <tr>
            <td>AIICO</td>
            <td>15%</td>
            <td>₦ 2,412,000.00</td>
          </tr>
          <tr>
            <td>Avon</td>
            <td>20%</td>
            <td>₦ 3,345,000.00</td>
          </tr>
          <tr>
            <td>AXA Mansard</td>
            <td>40%</td>
            <td>₦ 3,112,893.00</td>
          </tr>
          <tr class="font-bold">
            <td>Total</td>
            <td>100%</td>
            <td>₦ 754,112,000</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
  import { CustomDoughnutController } from "@/plugins/chart";
  import { Chart } from "chart.js";
  import { Options, Vue } from "vue-class-component";
  import ChartCard from "./chart-card.vue";

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
            // legend: {
            //   position: "bottom",
            //   labels: {
            //     boxWidth: 10,
            //     boxHeight: 10,
            //     pointStyle: "circle",
            //     usePointStyle: true,
            //   },
            // },
            //@ts-ignore
            legend: false,
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
