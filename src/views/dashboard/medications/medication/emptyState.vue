<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
      <img src="@/assets/img/empty-requests.svg" />
    <h3 class="text-center mt-5">
        You’ve made no requests!<br />
    </h3>
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
