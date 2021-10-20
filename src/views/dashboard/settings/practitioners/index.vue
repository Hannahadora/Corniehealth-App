<template>
  <div class="h-full flex justify-center">
    <div class="w-full mx-5">
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
        Practitioners
      </span>
      <span class="w-full">
        <practitioner-empty-state v-if="empty" />
        <practitioner-existing-state v-else />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import IPractitioner from "@/types/IPractitioner";
import { namespace } from "vuex-class";
import AddPractitioner from "./addPractitioner.vue";
import PractitionerEmptyState from "./emptyState.vue";
import PractitionerExistingState from "./existingState.vue";

const practitioner = namespace("practitioner");

@Options({
  name: "PractitionerIndex",
  components: {
    PractitionerExistingState,
    PractitionerEmptyState,
    AddPractitioner,
  },
})
export default class PractitionerIndex extends Vue {
  addPractitioner = false;
  practitionerToUpdate = {} as IPractitioner;

  get empty() {
    return this.practitioners.length < 1;
  }

  @practitioner.State
  practitioners!: IPractitioner[];

  @practitioner.Action
  fetchPractitioners!: () => Promise<void>;

  created() {
    this.fetchPractitioners();
  }
}
</script>
