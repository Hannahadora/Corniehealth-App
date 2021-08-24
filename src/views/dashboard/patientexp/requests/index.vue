<template>
  <div class="h-screen flex justify-center pb-96 bg-white shadow-md p-3 mt-2 mb-2 rounded w-full overflow-auto">
    <div class="w-full p-2 pb-96">
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
       Requests
      </span>
      <span class="w-full">
          <requests-empty-state
                v-if="empty"
          />
          <requests-existing-state
        
          v-else

          />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import IAppointment from "@/types/IAppointment";
import { Options, Vue } from "vue-class-component";
import RequestsEmptyState from "./emptyState.vue";
import RequestsExistingState from "./existingState.vue";
import { namespace } from "vuex-class";

const appointment = namespace("appointment");

@Options({
  name: "AppointmentIndex",
  components: {
    RequestsEmptyState,
    RequestsExistingState,
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
