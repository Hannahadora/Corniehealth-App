<template>
  <chart-card height="338px" title="Weight">
     <p class="text-primary font-bold text-sm -mt-5 mb-3">115.97<span class="font-light">kg</span></p>
<<<<<<< HEAD
    <canvas ref="registration_chart"></canvas>
=======
    <canvas ref="registration_chart" style="margin: auto;"></canvas>
>>>>>>> d9ee342ee977ec356439e98659a2cdec8cb2c1bd
  </chart-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChartCard from "./chart-card.vue";
import Chart from "chart.js/auto";


import { cornieClient } from "@/plugins/http";
import IStat from "@/types/IStat";
<<<<<<< HEAD
import { groupData } from "./chart-filter";
import { Prop, Watch } from "vue-property-decorator";
=======
import { getDatesAsChartLabel, groupData } from "./chart-filter";
import { Prop, Watch } from "vue-property-decorator";
import { formatDate, sortListByDate } from "./chart-filter"
import { namespace } from "vuex-class";
import IVital from "@/types/IVital";

const vitalsStore = namespace('vitals')
>>>>>>> d9ee342ee977ec356439e98659a2cdec8cb2c1bd

@Options({
  name: "BloodChart",
  components: {
    ChartCard,
  },
})
export default class WeightChart extends Vue {
<<<<<<< HEAD
=======
  @vitalsStore.State
  vitals!: IVital[];

  @vitalsStore.Action
  getVitals!: (patientId: string) => Promise<void>;

  loaded = false;

  get sortedVitals() {
    return sortListByDate(this.vitals);
  }
>>>>>>> d9ee342ee977ec356439e98659a2cdec8cb2c1bd
 filter = false;

  order: "Today" | "WTD" | "MTD" | "YTD" = "WTD";

  chart!: Chart;

<<<<<<< HEAD
  @Prop({ type: Number, default: 70 })
  height!: number;
=======
  height = "643px";
>>>>>>> d9ee342ee977ec356439e98659a2cdec8cb2c1bd

  get chartData() {
    const data = groupData(this.raw, this.order);
    return data;
  }

<<<<<<< HEAD
=======
  get weightsData() {
    const data = sortListByDate(this.vitals).map((vital: IVital) => vital.weight?.value);
    console.log(data, "Weight DAta");
    
    return data;
  }

  get labels() {
    return getDatesAsChartLabel(this.vitals);
  }

>>>>>>> d9ee342ee977ec356439e98659a2cdec8cb2c1bd
  raw: IStat[] = [];

  async fetchData() {
    try {
      const response = await cornieClient().get(
        "api/v1/patient/analytics/stats"
      );
      this.raw = response.data;
      console.log('raw', this.raw);
      this.chartData; //this line just  gets the vuejs reactivity system to refresh
    } catch (error) {
      window.notify({ msg: "Failed to fetch chart data", status: "error" });
    }
  }
  created() {
    this.fetchData();
  }

  @Watch("chartData")
  chartUpdated() {
    this.mountChart();
  }

<<<<<<< HEAD
  mounted() {
=======
  async mounted() {
    await this.getVitals(this.$route.params.id.toString());
>>>>>>> d9ee342ee977ec356439e98659a2cdec8cb2c1bd
    this.mountChart();
  }

  mountChart() {
    const ctx: any = this.$refs.registration_chart;
    // ctx.height = this.height;
<<<<<<< HEAD
        ctx.height = 95;
=======
        ctx.height = 200;
>>>>>>> d9ee342ee977ec356439e98659a2cdec8cb2c1bd
    this.chart?.destroy();
    this.chart = new Chart(ctx, {
      type: "line",
      data: {
<<<<<<< HEAD
        labels: this.chartData.labels,
=======
        labels: this.labels,
>>>>>>> d9ee342ee977ec356439e98659a2cdec8cb2c1bd
        datasets: [
          {
            fill: {
              target: "origin",
              below: "rgb(0, 0, 255)",
            },
            label: "Patient Registration Stat",
<<<<<<< HEAD
            data: this.chartData.dataSet,
=======
            data: this.weightsData,
            // data: this.chartData.dataSet,
>>>>>>> d9ee342ee977ec356439e98659a2cdec8cb2c1bd
            borderColor: "rgba(17, 79, 245, 1)",
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
              boxWidth: 5,
              boxHeight: 5,
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





  // chart!: Chart;

  // mounted() {
  //   this.mountChart();
  // }

  // mountChart() {
  //   const ctx: any = this.$refs.chart;
  //   ctx.height = 95;
  //   this.chart?.destroy();
  //   this.chart = new Chart(ctx, {
  //     type: "line",
  //     data: {
  //       labels: ["02-Jans", "03-Jan", "11:00", "04-Jan"],
  //       datasets: [
  //         {  
  //            fill: {
  //               target: 'origin',
  //               above: 'rgb(219 248 230)',   // Area will be red above the origin
  //               below: 'rgb(12 104 47)'    // And blue below the origin
  //             },
  //           data: [100, 20, 55, 220, 100],
  //           borderColor: "rgba(53, 186, 131, 1)",
  //           borderWidth: 1,
  //           tension: 0,
  //           pointRadius: 0,
  //           backgroundColor: ""
  //         },
  //       ],
  //     },
  //     options: {
  //       responsive: true,
  //       scales: {
  //         x: {
  //           grid: {
  //             display: false,
  //           },
  //         },
  //         y: {
  //           grid: {
  //             display: true,
  //           },
  //         },
  //       },
  //       plugins: {
  //        legend: {
  //       display: false
  //   },
  //         tooltip: {
  //           titleAlign: "center",
  //           titleMarginBottom: 9,
  //           bodyAlign: "center",
  //           padding: 30,
  //           position: "average",
  //           yAlign: "bottom",
  //         },
  //       },
  //     },
  //   });
  // }
}
</script>
