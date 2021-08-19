<template>
  <div class="h-full flex justify-centerb bg-white shadow-md p-3 mt-2 mb-2 rounded w-full overflow-auto">
    <div class="w-full">
    <span
        class="
          flex
          flex-col
          w-full
          justify-center
          border-b-2
          font-semibold
          text-xl text-primary
          py-4
          px-4
          p-4
       
        "
      >
       Appointment
      </span>
      <span class="w-full">
          <appointment-empty-state
                v-if="empty"
          />
          <appointment-existing-state
        
          v-else

          />
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

const appointment = namespace("appointment");

@Options({
  name: "AppointmentIndex",
  components: {
    AppointmentEmptyState,
    AppointmentExistingState,
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
  this.fetchAppointments()
    if (this.appointments.length < 1) this.fetchAppointments();
  }
}
</script>
