<template>
  <chart-card title="Resource Efficiency" height="439px">
    <div class="w-full grid grid-cols-1 gap-y-4">
      <rating-bar
        :percent="30"
        color="blue-400"
        title="AV. VISIT TIME PER PATIENT"
      >
        <template #label>
          <span class="font-extrabold"> 10mins </span>
        </template>
      </rating-bar>
      <rating-bar
        :percent="30"
        color="warning"
        title="AV. ENCOUNTER TIME PER PHYSICIAN"
      >
        <template #label>
          <span class="font-extrabold"> 5mins </span>
        </template>
      </rating-bar>

      <rating-bar
        :percent="30"
        color="blue-yonder"
        title="AV. TEST PROCESSING TIME"
      >
        <template #label>
          <span class="font-extrabold"> 8mins </span>
        </template>
      </rating-bar>

      <rating-bar :percent="30" color="success" title="AV. DISPENSE TIME">
        <template #label>
          <span class="font-extrabold"> 10mins </span>
        </template>
      </rating-bar>

      <rating-bar
        :percent="30"
        color="blue-300"
        title="AV. WAIT TIME PER PATIENT"
      >
        <template #label>
          <span class="font-extrabold"> 12mins </span>
        </template>
      </rating-bar>

      <rating-bar
        :percent="30"
        color="danger"
        title="AV. CHECKOUT PROCESSING TIME"
      >
        <template #label>
          <span class="font-extrabold"> 10mins </span>
        </template>
      </rating-bar>
    </div>
  </chart-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChartCard from "./chart-card.vue";
import RatingBar from "./rating-bar.vue";

@Options({
  name: "ResourceChart",
  components: {
    ChartCard,
    RatingBar,
  },
})
export default class ResourceChart extends Vue {}
</script>
