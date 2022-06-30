<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
      <img src="@/assets/img/empty-requests.svg" />
    <h3 class="text-center mt-5">
        You’ve made no requests!<br />
        Make a new service reques by clicking on “New Request” above
    </h3>
    <button
       @click="showModalDiagnostic = true"
      class="bg-danger rounded-xl text-white mt-5 py-3 px-6 text-sm font-semibold focus:outline-none hover:opacity-90"
    >
      New Requests
    </button>
  </div>
  <diagnostic-modal v-model="showModalDiagnostic"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DiagnosticModal from "./DiagnosticModal.vue";

@Options({
  components: {
    DiagnosticModal
  },
})
export default class diagnosticEmptyState extends Vue {
  showModalDiagnostic = false;
}
</script>
