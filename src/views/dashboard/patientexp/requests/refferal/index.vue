<template>
  <div class="h-full flex justify-center">
    <div class="w-full mx-5">
      <span class="w-full">
        <refferal-empty-state v-if="empty" />
        <refferal-existing-state v-else />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import IPractitioner from "@/types/IPractitioner";
import { namespace } from "vuex-class";
import RefferalEmptyState from "./emptyState.vue";
import RefferalExistingState from "./existingState.vue";
import IRefferal from "@/types/IRefferal";


const refferal = namespace("refferal");

@Options({
  name: "RefferalIndex",
  components: {
    RefferalExistingState,
    RefferalEmptyState,
  },
})
export default class RefferalIndex extends Vue {

  get empty() {
    return this.refferals.length < 1;
  }

  @refferal.State
  refferals!: IRefferal[];

  @refferal.Action
  fetchRefferal!: () => Promise<void>;

  async created() {
    await this.fetchRefferal();
  }
}
</script>
