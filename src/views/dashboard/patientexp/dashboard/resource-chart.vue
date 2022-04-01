<template>
  <chart-card title="Resource Efficiency" height="325px">
    <div class="w-full grid grid-cols-6 gap-x-6">
      <div class="resource-card flex flex-col">
        <div>
          <img class="mb-8" src="@/assets/resources-icons/icon(4).png" alt="" />
        </div>
        <span class="mb-4">Average Visit time per Patient</span>
        <div class="record">
          <span v-if="!restricted && record">30 mins</span
          ><span v-if="!restricted && !record">No Data Available</span>
          <span v-if="restricted">Restricted Data</span>
        </div>
      </div>
      <div class="resource-card flex flex-col">
        <div>
          <img class="mb-8" src="@/assets/resources-icons/icon(5).png" alt="" />
        </div>
        <span class="mb-4">Average Wait time per Patient</span>
        <div class="record">
          <span v-if="!restricted && record">20 mins</span
          ><span v-if="!restricted && !record">No Data Available</span>
          <span v-if="restricted">Restricted Data</span>
        </div>
      </div>
      <div class="resource-card flex flex-col">
        <div>
          <img class="mb-8" src="@/assets/resources-icons/icon(6).png" alt="" />
        </div>
        <span class="mb-4">Average Encounter Time per Physician</span>
        <div class="record">
          <span v-if="!restricted && record">15 mins</span
          ><span v-if="!restricted && !record">No Data Available</span>
          <span v-if="restricted">Restricted Data</span>
        </div>
      </div>
      <div class="resource-card flex flex-col">
        <div>
          <img class="mb-8" src="@/assets/resources-icons/icon(7).png" alt="" />
        </div>
        <span class="mb-4">Average Test Processing Time</span>
        <div class="record">
          <span v-if="!restricted && record">8 mins</span
          ><span v-if="!restricted && !record">No Data Available</span>
          <span v-if="restricted">Restricted Data</span>
        </div>
      </div>
      <div class="resource-card flex flex-col">
        <div>
          <img class="mb-8" src="@/assets/resources-icons/icon(8).png" alt="" />
        </div>
        <span class="mb-4">Average Dispense Time</span>
        <div class="record">
          <span v-if="!restricted && record">15 mins</span
          ><span v-if="!restricted && !record">No Data Available</span>
          <span v-if="restricted">Restricted Data</span>
        </div>
      </div>
      <div class="resource-card flex flex-col">
        <div>
          <img class="mb-8" src="@/assets/resources-icons/icon(9).png" alt="" />
        </div>
        <span class="mb-4">Average Check-out Processing Time</span>
        <div class="record">
          <span v-if="!restricted && record">25 mins</span
          ><span v-if="!restricted && !record">No Data Available</span>
          <span v-if="restricted">Restricted Data</span>
        </div>
      </div>
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
export default class ResourceChart extends Vue {
  record: boolean = false
  restricted: boolean = false
}
</script>

<style scoped>
.resource-card {
  background: #ffffff;
  padding: 24px;
  border: 0.5px solid #c2c7d6;
  border-radius: 8px;
}

.resource-card > span:nth-of-type(1) {
  font-size: 16px;
  line-height: 24px;
  color: #667499;
}

.record {
  font-weight: 700;
  font-size: 18px;
  line-height: 27px;
  color: #14171f;
}
</style>
