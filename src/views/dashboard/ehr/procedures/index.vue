<template>
  <div
    class="flex-col justify-center bg-white shadow-md p-3 mt-2 mb-2 rounded w-full h-screen overflow-auto"
  >
    <div class="w-full">
      <empty-state
        v-if="procedures.length <= 0"
        @procedure="() => (showNewProcedure = true)"
      />
      <exisiting-state
        @procedure="() => (showNewProcedure = true)"
        :procedures="procedures"
        v-else
      />
      <new-procedure v-model="showNewProcedure" />
    </div>
  </div>
</template>
<script lang="ts">
  import { ICondition } from "@/types/ICondition";
  import { IPatient } from "@/types/IPatient";
  import IProgressnote from "@/types/IProgressnote";
  import { Codeable } from "@/types/misc";
  import { Options, Vue } from "vue-class-component";
  import { namespace } from "vuex-class";
  import EmptyState from "./components/empty-state.vue";
  import exisitingState from "./components/exisiting-state.vue";
  // import ExistingState from "./existing-state.vue";
  // import NewProgressNote from "./new-progress-note.vue";
  import newProcedure from "./components/new-procedure.vue";
  const patients = namespace("patients");
  const procedure = namespace("procedure");

  @Options({
    name: "progressnotes",
    components: {
      EmptyState,
      // ExistingState,
      // NewProgressNote,
      exisitingState,
      newProcedure,
    },
  })
  export default class ProcedureNotes extends Vue {
    // @Prop({ type: String, default: "" })
    //   patientId!: string;
    showNewProcedure = false;
    patient = {} as IPatient;
    // items = "";

    patientProgressNotes = [] as IProgressnote[];

    categories: Codeable[] = [];

    isEmpty = false;

    @procedure.Action
    getProcedures!: (id: string) => Promise<any>;

    @procedure.State
    procedures!: any[];

    printRecorded(progress: any) {
      const dateString = progress.createdAt;
      const date = new Date(dateString);
      return date.toLocaleDateString();
    }

    printCondition(condition: ICondition) {
      const cat = condition.category?.replaceAll('"', "");
      return this.categories.find((s) => (s.code = cat))?.display;
    }

    printStatus(condition: ICondition) {
      const cat = condition.clinicalStatus?.replaceAll('"', "");
      return cat;
    }
    get patientId() {
      return this.$route.params.id.toString();
    }

    get items() {
      const items = this.patientProgressNotes.map((progress: any) => ({
        ...progress,
        original: progress,
        identifier: "XXXXX",
        recorded: this.printRecorded(progress),
        condition: this.printCondition(progress.condition),
        status: this.printStatus(progress.condition),
        // status:history.basicInfo.status
        // code: this.printCode(condition.code),
        // severity: this.printSeverity(condition.severity),
        // clinicalStatus: this.stripQuote(condition.clinicalStatus),
        // recorder: {
        //   name: printPractitioner(condition.practitioner!!),
        //   department: condition.practitioner!!.department,
        // },
      }));
      return items;
    }

    async created() {
      this.patientId;
      await this.getProcedures(this.patientId);
      console.log("procedures", this.procedures);
    }
  }
</script>
<style scoped>
  .h-65-screen {
    min-height: 80vh;
  }
</style>
