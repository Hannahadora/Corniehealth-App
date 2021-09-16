<template>
  <chart-card height="439px" title="Blood Pressure">
    <canvas ref="chart"></canvas>
  </chart-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChartCard from "./chart-card.vue";
import Chart from "chart.js/auto";

@Options({
  name: "BloodChart",
  components: {
    ChartCard,
  },
})
export default class BloodChart extends Vue {
  chart!: Chart;
  mounted() {
    this.mountChart();
  }

  mountChart() {}
}
</script>
