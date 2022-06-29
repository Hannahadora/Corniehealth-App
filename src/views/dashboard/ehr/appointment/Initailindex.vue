<template>
  <div
    class="flex justify-center bg-white shadow-sm rounded p-3 mb-2 w-full"
  >
    <div class="w-full">
      <span
        class="flex flex-col w-full justify-center border-b-2 font-bold mb-10 text-xl text-dye py-2"
      >
        Appointments
      </span>
      <span class="w-full h-screen">
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

const appointment = namespace("appointment");

@Options({
  name: "ApppointmentIndex",
  components: {
    AppointmentEmptyState,
    AppointmentExistingState,
  },
})
export default class ApppointmentIndex extends Vue {
  addHistory = false;
  show = false;

  get empty() {
    return this.patientappointments.length < 1;
  }
  get activePatientId() {
    const id = this.$route?.params?.id.toString();
    return id;
  }

  @appointment.State
  patientappointments!: IAppointment[];

  @appointment.State
  appointments!: IAppointment[];

  @appointment.Action
  fetchByIdAppointments!: (patientId: string) => Promise<void>;

  historyAdded() {
    this.show = false;
    this.patientappointments;
    this.fetchByIdAppointments(this.$route.params.id.toString());
  }

  async created() {
    await  this.fetchByIdAppointments(this.$route.params.id.toString());
  }
}
</script>
