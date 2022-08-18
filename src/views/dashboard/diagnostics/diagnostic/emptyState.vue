<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
      <img src="@/assets/img/empty-requests.svg" />
    <h3 class="text-center mt-5">
        You’ve made no requests!<br />
    </h3>
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
