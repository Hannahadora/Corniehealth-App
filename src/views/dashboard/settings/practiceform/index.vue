<template>
  <div class="h-full flex justify-center">
    <div class="w-full">
    <span
        class="
          flex
          border-b-2
          w-full
          font-semibold
          text-xl text-primary
          py-2
          mx-auto
        "
      >
       Practice Forms/Templates
      </span>
      <span class="w-full">
          <practiceform-empty-state v-if="empty" />
          <practiceform-existing-state v-else />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import IPracticeform from "@/types/IPracticeform";
import { Options, Vue } from "vue-class-component";
import PracticeformEmptyState from "./emptyState.vue";
import PracticeformExistingState from "./existingState.vue";
import { namespace } from "vuex-class";

const practiceform = namespace("practiceform");

@Options({
  name: "PracticeformIndex",
  components: {
    PracticeformEmptyState,
    PracticeformExistingState,
  },
})
export default class PracticeformIndex extends Vue {
  PracticeformToUpdate = {} as IPracticeform;

  get empty() {
    return this.practiceforms.length < 1;
  }

 @practiceform.State
  practiceforms!: IPracticeform[];

  @practiceform.Action
  fetchPracticeforms!: () => Promise<void>;


  created() {
  this.fetchPracticeforms()
    if (this.practiceforms.length < 1) this.fetchPracticeforms();
  }

}
</script>
