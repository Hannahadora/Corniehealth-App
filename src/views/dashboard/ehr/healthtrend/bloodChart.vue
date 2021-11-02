<template>
  <chart-card height="343px" title="Blood Pressure">
    <p class="text-primary font-bold text-sm -mt-5 mb-3">120/90 <span class="font-light">mmHgz</span></p>
    <canvas ref="chart"></canvas>
  </chart-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChartCard from "./chart-card.vue";
import Chart from "chart.js/auto";
import { namespace } from "vuex-class";
import IVital from "@/types/IVital";
import { Watch } from "vue-property-decorator";
import { getDatesAsChartLabel, sortListByDate } from "./chart-filter"

const vitalsStore = namespace('vitals')

@Options({
  name: "BloodChartt",
  components: {
    ChartCard,
  },
})
export default class BloodChartt extends Vue {
  @vitalsStore.State
  vitals!: IVital[];

  @vitalsStore.Action
  getVitals!: (patientId: string) => Promise<void>;

  loaded = false;

  get sortedVitals() {
    return sortListByDate(this.vitals);
  }

  get upperBand() {
    const values = this.sortedVitals?.flatMap(vital => vital.bloodPressure ? vital.bloodPressure : []).flat();
    const data = values?.filter(bloodPressure => bloodPressure.type === "systolic")?.map(bloodpressure => bloodpressure.measurement?.value);
    return data;    
  }

  get labels() {
    return getDatesAsChartLabel(this.sortedVitals);
  }

  get lowerBand() {
    const values = this.sortedVitals?.flatMap(vital => vital.bloodPressure ? vital.bloodPressure : []).flat();
    const data = values?.filter(bloodPressure => bloodPressure.type === "diastolic")?.map(bloodpressure => bloodpressure.measurement?.value);
    return data;    
  }

  chart!: Chart;
  async mounted() {
    await this.getVitals(this.$route.params.id.toString());
    this.upperBand
    this.mountChart();
  }

  mountChart() {
    const ctx: any = this.$refs.chart;
    ctx.height = 200;
    this.chart?.destroy();
    this.chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: this.labels,
        // labels: ["01-Jan", "02-Jan", "03-Jan", "11:00", "04-Jan"],
        datasets: [
          
          {
            fill: {
              target: "origin",
              below: "rgb(0, 0, 255)",
            },
            label: "Upper Band",
            // data: [90, 250, 150, 408, 200, 180],
            data: this.upperBand,
            borderColor: "rgba(17, 79, 245, 1)",
            borderWidth: 2,
            tension: 0.1,
          },
          {
            fill: {
              target: "origin",
              below: "rgb(0, 0, 255)",
            },
            label: "Lower Band",
            // data: [90, 250, 150, 408, 200, 180],
            data: this.lowerBand,
            borderColor: "rgba(254, 77, 60, 1)",
            borderWidth: 2,
            tension: 0.1,
          }
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

  @Watch('vitals')
  updateChart() {
    this.upperBand
    this.lowerBand
    this.mountChart()
  }

}
</script>

