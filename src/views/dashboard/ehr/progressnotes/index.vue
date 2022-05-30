<template>
  <div
    class="flex-col justify-center bg-white shadow-md p-3 mt-2 mb-2 rounded w-full h-screen overflow-auto"
  >
    <div class="w-full">
      <empty-state
        @progress_note="() => (showNewProgressNote = true)"
        v-if="items?.length <= 0"
      />
      <existing-state v-else :patient="patient" :patientId="patientId" :items="items" />
      <new-progress-note v-model="showNewProgressNote" />
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
import EmptyState from "./empty-state.vue";
import ExistingState from "./existing-state.vue";
import NewProgressNote from "./new-progress-note.vue";

const patients = namespace("patients");

@Options({
  name: "progressnotes",
  components: {
    EmptyState,
    ExistingState,
    NewProgressNote,
  },
})
export default class ProgressNotes extends Vue {
  // @Prop({ type: String, default: "" })
  //   patientId!: string;
  showNewProgressNote = false;
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
    return []
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
