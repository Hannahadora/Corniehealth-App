<template>
  <chart-card height="343px" title="Blood Pressure" @ordered="onOrder">
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
import { getDatesAsChartLabel, groupData, sortListByDate } from "./chart-filter"
import { cornieClient } from "@/plugins/http";
import IStat from "@/types/IStat";

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

  raw: IStat[] = [];
  order: "Today" | "WTD" | "MTD" | "YTD" = "WTD";

  get sortedVitals() {
    return sortListByDate(this.vitals);
  }

  get chartData() {
    const data = groupData(this.upperBandStats, this.order);
    // const data = groupData(this.raw, this.order);
    return data;
  }

  get upperBand() {
    const values = this.sortedVitals?.flatMap(vital => vital.bloodPressure ? vital.bloodPressure : []).flat();
    const data = values?.filter(bloodPressure => bloodPressure.type === "systolic")?.map(bloodpressure => bloodpressure.measurement?.value);
    return data;    
  }

  get upperBandStats() {
    const x = this.vitals.map(i => {
      return {
        bloodPresures: i?.bloodPressure?.map(j => {
          return {
            ...j,
            date: i.date
          }
        })
      }
    })
    const values = x?.flatMap(vital => vital ? vital.bloodPresures : []).flat();
    
    const data = values?.filter(bloodPressure => bloodPressure?.type === "systolic")?.map(bloodpressure => {      
      return {
        count: bloodpressure.measurement?.value,
        date: bloodpressure.date
      }
    }) as IStat[];
    return data;    
  }

  get lowerBandStats() {
    const x = this.vitals.map(i => {
      return {
        bloodPresures: i?.bloodPressure?.map(j => {
          return {
            ...j,
            date: i.date
          }
        })
      }
    })
    const values = x?.flatMap(vital => vital ? vital.bloodPresures : []).flat();
    
    const data = values?.filter(bloodPressure => bloodPressure?.type === "diastolic")?.map(bloodpressure => {      
      return {
        count: bloodpressure.measurement?.value,
        date: bloodpressure.date
      }
    }) as IStat[];
    return data;    
  }

  get diastolicData() {
    const data = groupData(this.lowerBandStats, this.order)
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

  onOrder(option: "Today" | "WTD" | "MTD" | "YTD") {
    this.order = option;
    this.chartData
    this.diastolicData
  }

  @Watch("order")
  orderUpdated() {
    this.chartData;
    this.diastolicData
  }

  async fetchData(patientId: string) {
    try {
      const response = await cornieClient().get(
        `api/v1/vitals/bp/stats/${patientId}`
      );
      this.raw = response.data;
      console.log(response.data, "RAW");
      
      
      // this.raw = response.data?.map((item: any) => {
      //   return { count: item.value, date: item.date }
      // });
      // this.chartData; //this line just  gets the vuejs reactivity system to refresh
    } catch (error) {
      window.notify({ msg: "Failed to fetch blood pressure chart data", status: "error" });
    }
  }

  async created() {
    await this.fetchData(this.$route.params.id.toString());
    
  }

  mountChart() {
    const ctx: any = this.$refs.chart;
    ctx.height = 200;
    this.chart?.destroy();
    this.chart = new Chart(ctx, {
      type: "line",
      data: {
        // labels: this.chartData.labels,
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
            data: this.chartData.dataSet,
            // data: this.upperBand,
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
            data: this.diastolicData.dataSet,
            // data: this.lowerBand,
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

