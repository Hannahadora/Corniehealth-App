<template>
  <chart-card height="439px" title="Active Visits">
    <canvas ref="chart"></canvas>
  </chart-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChartCard from "./chart-card.vue";
import Chart from "chart.js/auto";

@Options({
  name: "VisitsChart",
  components: {
    ChartCard,
  },
})
export default class VisitsChart extends Vue {
  chart!: Chart;
  mounted() {
    this.mountChart();
  }

  mountChart() {}
}
</script>
