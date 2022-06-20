<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
      <img src="@/assets/img/empty-requests.svg" />
    <h3 class="text-center mt-5">
        You’ve made no requests!<br />
        Make a new service reques by clicking on “New Request” above
    </h3>
    <button
    @click="showRefferalModal = true"
      class="bg-danger rounded text-white mt-5 py-3 px-6 text-sm font-semibold focus:outline-none hover:opacity-90"
    >
      New Requests
    </button>
  </div>
  <refferal-modal v-model="showRefferalModal"  @medication-added="medicationadded"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import RefferalModal from "./refferalModal.vue";
import { namespace } from "vuex-class";
import IRefferal from "@/types/IRefferal";


const refferal = namespace("refferal");
@Options({
  components: {
    RefferalModal
  },
})
export default class refferalEmptyState extends Vue {
  showRefferalModal = false;

   get patientId() {
    return this.$route.params.id as string;
  }

  @refferal.Action
  fetchRefferalById!: (patientId: string) => Promise<void>;

    async medicationadded(){
    await this.fetchRefferalById(this.patientId);
  }

}
</script>
