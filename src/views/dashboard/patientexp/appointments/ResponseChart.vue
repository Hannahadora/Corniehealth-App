<template>
  <div>
    <select class="border-none float-right" placeholder="june24,2021" name="date" id="date">
      <option value="date">Today</option>
    </select>
    <canvas ref="responsechart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import ResponseData from './response-data'
import CornieSelect from "@/components/cornieselect.vue";

export default {
  name: 'ResponseChart',
  components:{
    CornieSelect,
  },
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