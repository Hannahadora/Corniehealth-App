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
import IAppointment from "@/types/IAppointment";
import { namespace } from "vuex-class";
import AppointmentEmptyState from "./emptyState.vue";
import AppointmentExistingState from "./existingState.vue";

const appointment = namespace("appointment");

@Options({
  name: "AppointmentIndex",
  components: {
    AppointmentEmptyState,
    AppointmentExistingState,
  },
})
export default class AppointmentIndex extends Vue {

  get empty() {
    return this.patientappointments.length < 1;
  }

  @appointment.State
  patientappointments!: IAppointment[];



  @appointment.Action
  fetchByIdAppointments!: (patientId: string) => Promise<void>;

  async created() {
    await this.fetchByIdAppointments(this.$route.params.id.toString());
  }
}
</script>
