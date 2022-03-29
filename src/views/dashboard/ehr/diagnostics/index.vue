<template>
  <div class="flex justify-center bg-white shadow-md p-3 mb-2 rounded w-full">
    <div class="w-full">
      <span
        class="flex flex-col w-full justify-center border-b-2 font-bold mb-10 text-xl text-primary py-2"
      >
        Diagnostics
      </span>
      <span class="w-full h-screen">
       <diagnostic-empty-state v-if="empty" />
        <diagnostic-existing-state v-else />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import IPractitioner from "@/types/IPractitioner";
import { namespace } from "vuex-class";
import DiagnosticEmptyState from "./emptyState.vue";
import DiagnosticExistingState from "./existingState.vue";
import IDiagnostic from "@/types/IDiagnostic";


const diagnostic = namespace("diagnostic");

@Options({
  name: "DiagnosticIndex",
  components: {
    DiagnosticExistingState,
    DiagnosticEmptyState,
  },
})
export default class DiagnosticIndex extends Vue {

  get empty() {
    return this.patientdiagnostics.length < 1;
  }

  @diagnostic.State
  patientdiagnostics!: IDiagnostic[];

  get patientId() {
    return this.$route.params.id as string;
  }

  @diagnostic.Action
  fetchDiagnosticById!: (patientId: string) => Promise<void>;

  async created() {
    await this.fetchDiagnosticById(this.patientId);
  }
}
</script>
