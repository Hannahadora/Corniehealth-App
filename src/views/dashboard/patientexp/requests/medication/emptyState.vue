<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
      <img src="@/assets/img/empty-requests.svg" />
    <h3 class="text-center mt-5">
        You’ve made no requests!<br />
        Make a new service reques by clicking on “New Request” above
    </h3>
    <!-- <button class="bg-danger rounded text-white mt-5 py-3 px-6 text-sm font-semibold focus:outline-none hover:opacity-90" @click="showMedication = true">
      New Requests
    </button> -->
  </div>
  <medication-modal v-model="showMedication" />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import MedicationModal from "./medicationModal.vue";

@Options({
  components: {
      MedicationModal
  },
})
export default class medicationEmptyState extends Vue {
    showMedication  = false;
}
</script>
