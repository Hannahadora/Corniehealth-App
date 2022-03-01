<template>
  <div class="h-full flex justify-center">
    <div class="w-full mx-5">
      <span class="w-full">
        <appointment-empty-state v-if="empty" />
        <appointment-existing-state v-else />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import IPractitioner from "@/types/IPractitioner";
import { namespace } from "vuex-class";
import AppointmentEmptyState from "./emptyState.vue";
import AppointmentExistingState from "./existingState.vue";

const practitioner = namespace("practitioner");

@Options({
  name: "AppointmentIndex",
  components: {
    AppointmentEmptyState,
    AppointmentExistingState,
  },
})
export default class AppointmentIndex extends Vue {
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
