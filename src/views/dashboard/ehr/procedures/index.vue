<template>
  <div
    class="flex-col justify-center bg-white shadow-md p-3 mt-2 mb-2 rounded w-full h-screen overflow-auto"
  >
    <div class="w-full">
      <empty-state @procedure="() => (showNewProcedure = true)" />
      <!-- <existing-state v-else :patient="patient" :patientId="patientId" :items="items" />
      <new-progress-note v-model="showNewProcedure" /> -->
      <new-procedure v-model="showNewProcedure" />
    </div>
  </div>
</template>
<script lang="ts">
import { getDropdown } from "@/plugins/definitions";
import { cornieClient } from "@/plugins/http";
import { ICondition } from "@/types/ICondition";
import { IPatient } from "@/types/IPatient";
import IProgressnote from "@/types/IProgressnote";
import { Codeable } from "@/types/misc";
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import EmptyState from "./components/empty-state.vue";
// import ExistingState from "./existing-state.vue";
// import NewProgressNote from "./new-progress-note.vue";
import newProcedure from "./components/new-procedure.vue";
const patients = namespace("patients");

@Options({
  name: "progressnotes",
  components: {
    EmptyState,
    // ExistingState,
    // NewProgressNote,
    newProcedure,
  },
})
export default class ProgressNotes extends Vue {
  // @Prop({ type: String, default: "" })
  //   patientId!: string;
  showNewProcedure = false;
  patient = {} as IPatient;

  patientProgressNotes = [] as IProgressnote[];

  @patients.Action
  findPatient!: (patientId: string) => Promise<IPatient>;

  categories: Codeable[] = [];

  isEmpty = false;

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
    return this.$route.params.id;
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

  async fetchProgressnotes() {
    try {
      const { data } = await cornieClient().get(
        `/api/v1/progress-notes/${this.patientId}`
      );
      this.patientProgressNotes = data;
    } catch (error) {
      window.notify({
        msg: "There was an error when fetching patient's progress notes",
        status: "error",
      });
    }
  }

  async created() {
    await this.fetchProgressnotes();
    this.categories = await getDropdown(
      "http://hl7.org/fhir/ValueSet/condition-category"
    );
  }
}
</script>
<style scoped>
.h-65-screen {
  min-height: 80vh;
}
</style>
