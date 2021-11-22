<template>
  <div class="flex justify-center  bg-white shadow-md p-3 mt-2 mb-2 rounded w-full">
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
       Forms & Questionnaires
      </span>
      <span class="w-full h-screen">
          <!-- <forms-empty-state
              
          /> -->
          <practiceform-empty-state
                v-if="empty"
          />
          <practiceform-existing-state
        
          v-else

          />
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
