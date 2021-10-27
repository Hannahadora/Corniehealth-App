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
      Refferal
      </span>
      <span class="w-full h-screen">
          <reffer-empty-state
                v-if="empty"
          />
          <reffer-existing-state
          v-else

          />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import IOtherrequest from "@/types/IOtherrequest";
import { Options, Vue } from "vue-class-component";
import RefferEmptyState from "./emptyState.vue";
import RefferExistingState from "./existingState.vue";
import { namespace } from "vuex-class";

const otherrequest = namespace("otherrequest");

@Options({
  name: "RefferalIndex",
  components: {
    RefferEmptyState,
    RefferExistingState,
  },
})
export default class RefferIndex extends Vue {
  addDiagnotic = false;
  show=false;

  get empty() {
    return this.otherrequests.length < 1;
  }

 @otherrequest.State
  otherrequests!: IOtherrequest[];

  @otherrequest.Action
  fetchOtherrequests!: () => Promise<void>;


created() {
    if (this.otherrequests.length < 1) this.fetchOtherrequests();
  }
}
</script>
