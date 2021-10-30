<template>
  <div class="flex justify-center  bg-white shadow-md p-3 mb-2 rounded w-full">
    <div class="w-full">
    <span
        class="
          flex
          flex-col
          w-full
          justify-center
          border-b-2
          font-bold
          mb-10
          text-xl text-primary
            py-2
        "
      >
      Diagnostics
      </span>
      <span class="w-full h-screen">
          <diagnostic-empty-state
                v-if="empty"
          />
          <diagnostic-existing-state
          v-else

          />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import IOtherrequest from "@/types/IOtherrequest";
import { Options, Vue } from "vue-class-component";
import DiagnosticEmptyState from "./emptyState.vue";
import DiagnosticExistingState from "./existingState.vue";
import { namespace } from "vuex-class";

const otherrequest = namespace("otherrequest");

@Options({
  name: "DiagonosticsIndex",
  components: {
    DiagnosticEmptyState,
    DiagnosticExistingState,
  },
})
export default class DiagnoticIndex extends Vue {
  addDiagnotic = false;
  show=false;

  get empty() {
    return this.patientrequests.length < 1;
  }

//  @otherrequest.State
//   otherrequests!: IOtherrequest[];

//   @otherrequest.Action
//   fetchOtherrequests!: () => Promise<void>;
 get patientId() {
    return this.$route.params.id as string;
  }
     @otherrequest.State
  patientrequests!: any[];

   medicationAdded() {
     this.show = false;
     this.patientrequests;
   this.fetchOtherrequestsById(this.patientId);
  }

 @otherrequest.Action
  fetchOtherrequestsById!: (patientId: string) => Promise<void>;


created() {
    if (this.patientrequests.length < 1) this.fetchOtherrequestsById(this.patientId);
  }
}
</script>
