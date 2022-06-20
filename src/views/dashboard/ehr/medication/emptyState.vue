<template>
  <div class="w-full pb-80">
    <div class="w-full flex flex-col justify-center items-center h-96">
            <img src="@/assets/img/empty-requests.svg" />
    <h3 class="text-center mt-5">
        You’ve made no requests!<br />
        Make a new service reques by clicking on “New Request” above
    </h3>
      <span class="flex justify-center w-full">
          <button class="bg-danger rounded text-white mt-5 py-3 px-6 text-sm font-semibold focus:outline-none hover:opacity-90" @click="showMedication = true">
      New Requests
    </button>
      </span>
    </div>
  
  </div>

  <medication-modal v-model="showMedication" @medication-added="medicationadded"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import MedicationModal from "./medicationModal.vue";
import IRequest from "@/types/IRequest";
import { namespace } from "vuex-class";

const request = namespace("request");
@Options({
  components: {
      MedicationModal
  },
})
export default class medicationEmptyState extends Vue {
    showMedication  = false;

     get patientId() {
    return this.$route.params.id as string;
  }

  @request.State
  patientrequests!: IRequest[];

  @request.Action
  fetchrequestsById!: (patientId: string) => Promise<void>;

    async medicationadded(){
    await this.fetchrequestsById(this.patientId);
  }

}
</script>
