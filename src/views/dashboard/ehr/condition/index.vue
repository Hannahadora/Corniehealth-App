<template>
  <empty-state v-if="empty" />
  <existing-state v-else />
</template>

<script lang="ts">
import { IPatient } from "@/types/IPatient";
import { Vue, Options } from "vue-class-component";
import { namespace } from "vuex-class";
import EmptyState from "./empty-state.vue";
import ExistingState from "./existing-state.vue";

const patients = namespace("patients");

@Options({
  name: "ConditionIndex",
  components: {
    EmptyState,
    ExistingState,
  },
})
export default class Patients extends Vue {
  @patients.State
  patients!: IPatient[];

  @patients.Action
  fetchPatients!: () => Promise<void>;

  get empty() {
    return this.patients.length < 1;
  }

  created() {
    if (this.empty) this.fetchPatients();
  }
}
</script>
