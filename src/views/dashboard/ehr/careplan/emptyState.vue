<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
    <img src="@/assets/img/careplans.svg" />
    <div class="flex flex-col justify-center items-center">
      <h3 class="text-center mt-5 font-bold">No Care Plan on Record</h3>
      <p class="text-xs text-gray-400">
       Care Plans added will be displayed here
      </p>
    </div>
    <button
      class="bg-danger rounded-lg font-semibold text-sm text-white mt-5 py-2 px-4 focus:outline-none hover:opacity-90"
      @click="showCareplan = true"
    >
      Create a Care Plan
    </button>
  </div>
  <careplan-modal v-model="showCareplan"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CareplanModal from "./PlanModal.vue";
@Options({
  components: {CareplanModal },
})
export default class CarePlanEmptyState extends Vue {
  showCareplan = false;
}
</script>
