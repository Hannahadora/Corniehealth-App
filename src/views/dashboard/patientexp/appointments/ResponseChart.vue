<template>
  <div>
    <cornie-select class="border-none float-right w-32" placeholder="june24,2021" v-model="date" :items="['Today']">
          </cornie-select>
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
      ResponseData: ResponseData,
      date:""
    }
  },
  mounted() {
    const ctx = this.$refs.responsechart;
   const chart = new Chart(ctx, this.ResponseData);
  }
}
</script>