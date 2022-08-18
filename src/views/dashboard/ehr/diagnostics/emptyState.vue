<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
      <img src="@/assets/img/empty-requests.svg" />
    <h3 class="text-center mt-5">
        You’ve made no requests!<br />
        Make a new service request by clicking on “New Request” above
    </h3>
    <button
       @click="showModalDiagnostic = true"
      class="bg-danger rounded-xl text-white mt-5 py-3 px-6 text-sm font-semibold focus:outline-none hover:opacity-90"
    >
      New Requests
    </button>
  </div>
  <diagnostic-modal v-model="showModalDiagnostic" @medication-added="medicationadded"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DiagnosticModal from "./DiagnosticModal.vue";
import { namespace } from "vuex-class";

const diagnostic = namespace("diagnostic");
@Options({
  components: {
    DiagnosticModal
  },
})
export default class diagnosticEmptyState extends Vue {
  showModalDiagnostic = false;

     get patientId() {
    return this.$route.params.id as string;
  }

  @diagnostic.Action
  fetchDiagnosticById!: (patientId: string) => Promise<void>;

    async medicationadded(){
    await this.fetchDiagnosticById(this.patientId);
  }
}
</script>
