<template>
  <div
    class="
      flex
      justify-center
      h-65-screen
      bg-white
      shadow-md
      p-3
      mb-2
      rounded
      w-full
    "
  >
    <div class="w-full">
      <span
        class="
          flex flex-col
          w-full
          justify-center
          border-b-2
          font-bold
          mb-3
          text-xl text-primary
          py-2
        "
      >
        Progress Notes
      </span>
      <p>fdfdfd</p>{{items}}
      <span class="w-full">
        <empty-state v-if="items?.length <= 0" />
        <existing-state v-else :patient='patient' :patientId='patientId' :items="items" />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import EmptyState from "./empty-state.vue";
import ExistingState from "./existing-state.vue";



import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { IPatient } from "@/types/IPatient";
import  IProgressnote  from "@/types/IProgressnote";

import { cornieClient } from "@/plugins/http";
import { Codeable } from "@/types/misc";
import { ICondition } from "@/types/ICondition";
import { getDropdown } from "@/plugins/definitions";





const patients = namespace("patients");

@Options({
  name: "progressnotes",
  components: {
    EmptyState,
    ExistingState,
  },
})
export default class ProgressNotes extends Vue {
@Prop({ type: String, default: "" })
  patientId!: string;

  patient = {} as IPatient;

  patientProgressNotes = [] as IProgressnote[];


 @patients.Action
  findPatient!: (patientId: string) => Promise<IPatient>;

  categories: Codeable[] = [];

 isEmpty= false;

  printRecorded(progress: any) {
    const dateString = progress.createdAt;
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

   printCondition(condition : ICondition) {
    const cat = condition.category?.replaceAll('"', "");
    return this.categories.find((s) => (s.code = cat))?.display;
  }


  get items() {
    const items = this.patientProgressNotes.map((progress: any) => ({
      ...progress,
      original: progress,
      identifier: "XXXXX",
      recorded: this.printRecorded(progress),
      condition: this.printCondition(progress.condition),
      status: progress.clinicalStatus,
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
    console.log('progresssssfff1' , this.patientId);
    try {
      const { data } = await cornieClient().get(
        `/api/v1/progress-notes/${this.patientId}`
      );
      this.patientProgressNotes = data;
      console.log('progresssssfff2', this.patientProgressNotes );
    } catch (error) {
      window.notify({
        msg: "There was an error when fetching patient's progress notes",
        status: "error",
      });
    }
  } 

  async created() {
     await this.fetchProgressnotes();
    console.log('zzz',  this.patientProgressNotes);
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
