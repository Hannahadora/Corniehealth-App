<template>
  <div
    class="flex justify-center pb-76 bg-white shadow-md p-3 mt-2 mb-2 rounded w-full"
  >
    <div class="w-full p-2 pb-96">
      <span
        class="flex flex-col w-full justify-center border-b-2 font-bold mb-10 text-xl text-primary py-2"
      >
        Appointment
      </span>
      <span class="w-full">
        <appointment-empty-state v-if="empty" />
        <appointment-existing-state v-else />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import IAppointment from "@/types/IAppointment";
import { Options, Vue } from "vue-class-component";
import AppointmentEmptyState from "./emptyState.vue";
import AppointmentExistingState from "./existingState.vue";
import { namespace } from "vuex-class";
import Response from "./response.vue";
const appointment = namespace("appointment");

@Options({
  name: "AppointmentIndex",
  components: {
    AppointmentEmptyState,
    AppointmentExistingState,
    Response,
  },
})
export default class AppointmentIndex extends Vue {
  addAppointment = false;
  AppointmentToUpdate = {} as IAppointment;

  get empty() {
    return this.appointments.length < 1;
  }

  @appointment.State
  appointments!: IAppointment[];

  @appointment.Action
  fetchAppointments!: () => Promise<void>;

  created() {
    this.fetchAppointments();
    if (this.appointments.length < 1) this.fetchAppointments();
  }
}
</script>
