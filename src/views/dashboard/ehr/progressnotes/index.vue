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
      <span class="w-full">
        <empty-state v-if="isEmpty" />
        <existing-state v-else :patient='patient' :patientId='patientId' />
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

 @patients.Action
  findPatient!: (patientId: string) => Promise<IPatient>;

  get isEmpty() {
    return false;
  }
  
}
</script>
<style scoped>
.h-65-screen {
  min-height: 80vh;
}
</style>
