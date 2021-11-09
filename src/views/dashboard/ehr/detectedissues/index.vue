<template>
  <div class="flex justify-center bg-white shadow-md p-3 mb-2 rounded w-full">
    <div class="w-full">
      <span
        class="
          flex flex-col
          w-full
          justify-center
          border-b-2
          font-bold
          mb-10
          text-xl text-primary
          py-2
        "
      >
        Detected issues
      </span>
      <span class="w-full h-screen">
        <issues-empty-state v-if="empty" />
        <issues-existing-state
          @issues-added="issuesAdded"
          :issues="issues"
          v-else
        />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
// import IAllergy from "@/types/IAllergy";
import IIssues from "@/types/IIssues";
import { Options, Vue } from "vue-class-component";
import IssuesEmptyState from "./emptyState.vue";
import IssuesExistingState from "./existingState.vue";
import { namespace } from "vuex-class";

const issues = namespace("issues");

@Options({
  name: "AttachmentsIndex",
  components: {
    IssuesEmptyState,
    IssuesExistingState,
  },
})
export default class AttachmentsIndex extends Vue {
  addAllergy = false;
  show = false;
  // TaskToUpdate = {} as IAllergy;

  get empty() {
    return this.issues.length < 1;
  }
 get activePatientId() {
      const id = this.$route?.params?.id as string;
      return id;
  }


  @issues.State
  issues!: IIssues[];

  @issues.Action
  fetchIssues!: (patientId: string) => Promise<void>;

  issuesAdded() {
    this.show = false;
    this.issues;
    this.fetchIssues(this.activePatientId);
  }

  mounted() {
    this.fetchIssues(this.activePatientId);
  }

  created() {
    if (this.issues.length < 1) this.fetchIssues(this.activePatientId);
  }
}
</script>
