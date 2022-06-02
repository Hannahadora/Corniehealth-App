<template>
  <chart-card height="338px" title="Blood Pressure" @ordered="onOrder">
    <p class="text-primary font-bold text-sm -mt-5 mb-3">
      {{ diastolicAverage || 0}}/{{ systolicAverage || 0 }}
      <span class="font-light">mmHgz</span>
    </p>
    <canvas ref="chart" style="margin: auto; width: 100%"></canvas>
  </chart-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChartCard from "./chart-card.vue";
import Chart from "chart.js/auto";
import { namespace } from "vuex-class";
import IVital from "@/types/IVital";
import { Watch } from "vue-property-decorator";
import {
  getDatesAsChartLabel,
  groupData,
  sortListByDate,
} from "./chart-filter";
import { cornieClient } from "@/plugins/http";
import IStat from "@/types/IStat";
import { getChartData } from "./helper/vitals-chart-helper";

const vitalsStore = namespace("vitals");

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
    startDate = new Date().toISOString();

  raw: IStat[] = [];
  diastolicRaw: IStat[] = [];
  systolicRaw: IStat[] = [];
  order: "Today" | "WTD" | "MTD" | "YTD" = "WTD";

  get sortedVitals() {
    return sortListByDate(this.vitals);
  }

  // get chartData() {
  //   const data = groupData(this.upperBandStats, this.order);
  //   // const data = groupData(this.raw, this.order);
  //   return data;
  // }

  get date(){
    if (this.order == 'Today'){
      return new Date().toISOString();
    }else if(this.order == 'WTD'){
      const  today = new Date();
      const  nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7).toISOString();
      return nextweek;
    }else if(this.order == 'MTD'){
      const Xmas95 = new Date();
      const month = Xmas95.getMonth();
      const newmonth = new Date(month).toISOString();
      return newmonth;
    }else {
      const today = new Date();
      const year = today.getFullYear();
      const newyear = new Date(year).toISOString();
       return newyear;
    }
  }

  get upperBand() {
    const values = this.sortedVitals
      ?.flatMap((vital) => (vital.bloodPressure ? vital.bloodPressure : []))
      .flat();
    const data = values
      ?.filter((bloodPressure) => bloodPressure.type === "systolic")
      ?.map((bloodpressure) => bloodpressure.measurement?.value);
    return data;
  }

  // get upperBandStats() {
  //   const x = this.vitals.map((i) => {
  //     return {
  //       bloodPresures: i?.bloodPressure?.map((j) => {
  //         return {
  //           ...j,
  //           date: i.date,
  //         };
  //       }),
  //     };
  //   });
  //   const values = x
  //     ?.flatMap((vital) => (vital ? vital.bloodPresures : []))
  //     .flat();

  //   const data = values
  //     ?.filter((bloodPressure) => bloodPressure?.type === "systolic")
  //     ?.map((bloodpressure) => {
  //       return {
  //         count: bloodpressure.measurement?.value,
  //         date: bloodpressure.date,
  //       };
  //     }) as IStat[];
  //   return data;
  // }

  // get lowerBandStats() {
  //   const x = this.vitals.map((i) => {
  //     return {
  //       bloodPresures: i?.bloodPressure?.map((j) => {
  //         return {
  //           ...j,
  //           date: i.date,
  //         };
  //       }),
  //     };
  //   });
  //   const values = x
  //     ?.flatMap((vital) => (vital ? vital.bloodPresures : []))
  //     .flat();

    // const data = values
    //   ?.filter((bloodPressure) => bloodPressure?.type === "diastolic")
    //   ?.map((bloodpressure) => {
    //     return {
    //       count: bloodpressure.measurement?.value,
    //       date: bloodpressure.date,
    //     };
    //   }) as IStat[];
    // return data;
  // }

  // get diastolicData() {
  //   const data = groupData(this.lowerBandStats, this.order);
  //   return data;
  // }

  get labels() {
    return getDatesAsChartLabel(this.sortedVitals);
  }

  get lowerBand() {
    const values = this.sortedVitals
      ?.flatMap((vital) => (vital.bloodPressure ? vital.bloodPressure : []))
      .flat();
    const data = values
      ?.filter((bloodPressure) => bloodPressure.type === "diastolic")
      ?.map((bloodpressure) => bloodpressure.measurement?.value);
    return data;
  }

  get diastolicChartData() {
    const data = getChartData(this.diastolicRaw, this.order);
    return data;
  }

  get systolicChartData() {
    // if (this.systolicRaw?.length === 0) return [ ];
    const data = getChartData(this.systolicRaw, this.order);
    // const data = groupData(this.systolicRaw, this.order);
    return data;
  }

  get systolicAverage() {
    const values = this.systolicRaw?.map((a) => a.count);
    if (values?.length === 0) return 0;
    return Math.ceil(values?.reduce((a, b) => a + b) / values?.length);
  }
  get diastolicAverage() {
    const values = this.diastolicRaw?.map((a) => a.count);
    if (values?.length === 0) return 0;
    return Math.ceil(values?.reduce((a, b) => a + b) / values?.length);
  }

  chart!: Chart;
  async mounted() {
    await this.getVitals(this.$route.params.id.toString());
    this.upperBand;
    this.mountChart();
  }

  onOrder(option: "Today" | "WTD" | "MTD" | "YTD") {
    this.order = option;
    // this.chartData;
    this.diastolicChartData;
    this.systolicChartData;
  }

  @Watch("order")
  orderUpdated() {
    // this.chartData;
    this.diastolicChartData;
    this.systolicChartData;
    this.mountChart();
  }

  async fetchData(patientId: string) {
    try {
      const response = await cornieClient().get(
        `api/v1/health-trends/bp-stats/${patientId}`,
        {
          start: this.startDate,
          end: this.date,
        }
      );
      this.diastolicRaw = response?.data?.diastolicData?.map((record: any) => {
        return { count: record.value, date: record.date };
      });
      this.systolicRaw = response?.data?.systolicData?.map((record: any) => {
        return { count: record.value, date: record.date };
      });
      this.raw = response.data;

      // this.raw = response.data?.map((item: any) => {
      //   return { count: item.value, date: item.date }
      // });
      // this.chartData; //this line just  gets the vuejs reactivity system to refresh
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

  mountChart() {
    const ctx: any = this.$refs.chart;
    ctx.height = 130;
    this.chart?.destroy();
    this.chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: this.diastolicChartData?.labels,
        datasets: [
          {
            fill: {
              target: "origin",
              below: "rgb(0, 0, 255)",
            },
            label: "Systolic",
            // data: [90, 250, 150, 408, 200, 180],
            data: this.systolicChartData ? this.systolicChartData.dataSet : [],
            borderColor: "rgba(17, 79, 245, 1)",
            backgroundColor:"rgba(17, 79, 245, 1)",
            borderWidth: 2,
            tension: 0.1,
          },
          {
            fill: {
              target: "origin",
              below: "rgb(0, 0, 255)",
            },
            label: "Diastolic",
            // data: [90, 250, 150, 408, 200, 180],
            data: this.diastolicChartData
              ? this.diastolicChartData.dataSet
              : [],
            borderColor: "rgba(247, 181, 56, 1)",
            backgroundColor:"rgba(247, 181, 56, 1)",
            borderWidth: 2,
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
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

  @Watch("vitals")
  updateChart() {
    this.upperBand;
    this.lowerBand;
    this.mountChart();
  }
}
</script>
