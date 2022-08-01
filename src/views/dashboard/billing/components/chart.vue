<template>
  <div>
    <canvas ref="billing-chart"></canvas>
  </div>
</template>
<script lang="ts">
  import DropDown from "@/components/drop-down.vue";
  import ChevronDownIcon from "@/components/icons/chevrondown.vue";
  import { cornieClient } from "@/plugins/http";
  import IStat from "@/types/IStat";
  import Chart from "chart.js/auto";
  import { Options, Vue } from "vue-class-component";
  import { Prop, Watch } from "vue-property-decorator";
  import { groupData } from "../../patientexp/dashboard/chart/chart-filter";

  @Options({
    name: "RegistrationChart",
    components: {
      ChevronDownIcon,
      DropDown,
    },
  })
  export default class RegistrationChart extends Vue {
    filter = false;

    order: "Today" | "WTD" | "MTD" | "YTD" = "WTD";

    chart!: Chart;

    @Prop({ type: Number, default: 70 })
    height!: number;

    @Prop({ type: Object, default: "" })
    range!: object;

    get chartData() {
      const data = groupData(this.raw, this.order);
      return data;
    }

    rawEncounter: IStat[] = [];

    get totalEncounterChart() {
      return groupData(this.rawEncounter, this.order);
    }

    rawCollections: IStat[] = [];

    get totalCollectionChart() {
      return groupData(this.rawCollections, this.order);
    }

    raw: IStat[] = [];

    restricted = false;

    reorder(order: "Today" | "WTD" | "MTD" | "YTD") {
      this.order = order;
      this.filter = false;
    }

    async fetchData() {
      try {
        const { start, end } = this.range as any;
        if (!start || !end) return;
        const startDate = new Date(start).toISOString();
        const endDate = new Date(end).toISOString();
        const response = await cornieClient().get(
          `api/v1/bill/stat/collection-trend?start=${startDate}&end=${endDate}`
        );

        const { totalEncounters, totalCollections } = response.data;
        this.rawEncounter = totalEncounters;
        this.rawCollections = totalCollections;
        if (response.data == "You are not allowed to access this resource") {
          this.restricted = true;
        }
        this.chartData; //this line just  gets the vuejs reactivity system to refresh
      } catch (error) {
        console.log("error", error);
        window.notify({ msg: "Failed to fetch chart data", status: "error" });
      }
    }
    created() {
      this.fetchData();
    }

    @Watch("range")
    rangeUpdated() {
      console.log("range", this.range);
      this.fetchData();
    }

    @Watch("totalEncounterChart")
    EchartUpdated() {
      this.mountChart();
    }

    @Watch("totalCollectionChart")
    CchartUpdated() {
      this.mountChart();
    }

    mounted() {
      this.mountChart();
    }

    mountChart() {
      const ctx: any = this.$refs["billing-chart"];
      ctx.height = this.height;
      this.chart?.destroy();
      this.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.totalEncounterChart.labels,
          datasets: [
            {
              fill: {
                target: "origin",
                below: "rgb(51, 51, 255)",
              },
              label: "Total Encounter",
              data: this.totalEncounterChart.dataSet,
              borderColor: "rgb(51, 51, 255)",
              // showLine: true,
              borderWidth: 2,
              tension: 0.1,
            },
            {
              fill: {
                target: "origin",
                below: "rgb(0, 102, 102)",
              },
              label: "Total Collection",
              data: this.totalCollectionChart.dataSet,
              borderColor: "rgb(0, 102, 102)",
              // showLine: true,
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
  }
</script>
