<template>
  <div>
    <canvas ref="responsechart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import ResponseData from './response-data'

export default {
  name: 'ResponseChart',
  data() {
    return {
      ResponseData: ResponseData
    }
  },
  mounted() {
    const ctx = this.$refs.responsechart;
   const chart = new Chart(ctx, this.ResponseData);
  }
}
</script>