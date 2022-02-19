<template>
  <div class="h-full flex justify-center">
    <div class="w-full mx-5">
      <span
        class="flex border-b-2 w-full font-semibold text-xl text-primary py-2 mx-auto"
      >
        Specialties
      </span>
      <span class="w-full">
        <special-empty-state v-if="empty" />
        <special-existing-state v-else />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import IPractitioner from "@/types/IPractitioner";
import { namespace } from "vuex-class";
import SpecialEmptyState from "./emptyState.vue";
import SpecialExistingState from "./existingState.vue";

const practitioner = namespace("practitioner");

@Options({
  name: "PractitionerIndex",
  components: {
    SpecialExistingState,
    SpecialEmptyState,
  },
})
export default class SpecialIndex extends Vue {
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
