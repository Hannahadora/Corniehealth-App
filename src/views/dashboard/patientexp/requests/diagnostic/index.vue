<template>
  <div class="h-full flex justify-center">
    <div class="w-full mx-5">
      <span class="w-full">
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
    return this.diagnostics.length < 1;
  }

  @diagnostic.State
  diagnostics!: IDiagnostic[];

  @diagnostic.Action
  fetchDiagnostic!: () => Promise<void>;

  async created() {
    await this.fetchDiagnostic();
  }
}
</script>
