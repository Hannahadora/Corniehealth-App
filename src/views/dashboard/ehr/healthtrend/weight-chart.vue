<template>
  <chart-card height="338px" title="Weight" @ordered="onOrder">
    <p class="text-primary font-bold text-sm -mt-5 mb-3">
      {{ average }}<span class="font-light">kg</span>
    </p>
    <canvas ref="registration_chart" style="margin: auto; width: 90%"></canvas>
  </chart-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChartCard from "./chart-card.vue";
import Chart from "chart.js/auto";

import { cornieClient } from "@/plugins/http";
import IStat from "@/types/IStat";
import { getDatesAsChartLabel, groupData } from "./chart-filter";
import { Prop, Watch } from "vue-property-decorator";
import { formatDate, sortListByDate } from "./chart-filter";
import { namespace } from "vuex-class";
import IVital from "@/types/IVital";
import { getChartData } from "./helper/vitals-chart-helper";
import moment from "moment";

const vitalsStore = namespace("vitals");

@Options({
  name: "weightChart",
  components: {
    ChartCard,
  },
})
export default class WeightChart extends Vue {
  @vitalsStore.State
  vitals!: IVital[];

  @vitalsStore.Action
  getVitals!: (patientId: string) => Promise<void>;

  loaded = false;

  get sortedVitals() {
    return sortListByDate(this.raw);
  }
  filter = false;

  order: "Today" | "WTD" | "MTD" | "YTD" = "WTD";

  chart!: Chart;

  height = "443px";
  startDate = new Date().toISOString();
  endDate = "";

  onOrder(option: "Today" | "WTD" | "MTD" | "YTD") {
    this.order = option;
    this.fetchData(this.$route.params.id.toString())
  }
 
  get date(){
    if (this.order == 'Today'){
      return new Date().toISOString();
    }else if(this.order == 'WTD'){
      var oneWeekAgo = moment().subtract(1, 'week');
      console.log(oneWeekAgo, 'week');
      return oneWeekAgo.format();
    }else if(this.order == 'MTD'){
      var oneMonthsAgo = moment().subtract(1, 'months');
      return oneMonthsAgo.format();
    }else {
      var oneYearAgo = moment().subtract(1, 'year');
      return oneYearAgo.format();
    }
  }


  get chartData() {
    const data = getChartData(this.raw, this.order);
    // const data = groupData(this.raw, this.order);
    return data;
  }

  get average() {
    const values = this.raw?.map((a:any) => a.count);
    if (values?.length === 0) return 0;
    return (values.reduce((a:any, b:any) => a + b) / values?.length).toFixed(1);
  }

  get labels() {
    return getDatesAsChartLabel(this.vitals);
  }

  raw = [] as any;

  async fetchData(patientId: string) {
    const [splitDate] = this.startDate.split('T');
   const date = splitDate;
   const [splitDate2] = this.date.split('T');
   const date2 = splitDate2;
    try {
      const response = await cornieClient().get(
        `api/v1/health-trends/weight-stats/${patientId}`,
        {
          start: date2,
          end: date,
        }
      );
       console.log(response.data,'weight record')
   
      const rawdata = response.data
      this.raw = Object.entries(rawdata).map((key, value) => {
          return {count: value, date: key}
      })
      this.chartData; //this line just  gets the vuejs reactivity system to refresh
    } catch (error:any) {
      window.notify({
        msg: error.response.data.message,
        status: "error",
      });
    }
  }
  async created() {
    await this.fetchData(this.$route.params.id.toString());
  }

  @Watch("chartData")
  chartUpdated() {
    this.mountChart();
  }

  @Watch("order")
  orderUpdated() {
    this.chartData;
  }

  async mounted() {
    this.mountChart();
  }

  mountChart() {
    const ctx: any = this.$refs.registration_chart;
    // ctx.height = this.height;
    ctx.height = 200;
    this.chart?.destroy();
    this.chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: this.chartData?.labels,
        datasets: [
          {
            fill: {
              target: "origin",
              below: "rgb(0, 0, 255)",
            },
            label: "Patient Weight Stats",
            data: this.chartData ? this.chartData.dataSet : [],
            borderColor: "rgba(17, 79, 245, 1)",
            backgroundColor: "rgba(17, 79, 245, 1)",
            borderWidth: 2,
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
         maintainAspectRatio: true,
         aspectRatio: 2.3,
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
