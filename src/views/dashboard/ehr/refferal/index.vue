<template>
 <div class="flex justify-center bg-white h-screen shadow-md p-3 mb-2 rounded w-full">
    <div class="w-full">
      <span
        class="flex flex-col w-full justify-center border-b-2 font-bold mb-10 text-xl text-primary py-2"
      >
        Referrals 
      </span>
      <span class="w-full h-screen">
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
    return this.patientrefferals.length < 1;
  }

  get patientId() {
    return this.$route.params.id as string;
  }

  @refferal.State
  patientrefferals!: IRefferal[];

  @refferal.Action
  fetchRefferalById!: (patientId: string) => Promise<void>;

  async created() {
    await this.fetchRefferalById(this.patientId);
  }
}
</script>
