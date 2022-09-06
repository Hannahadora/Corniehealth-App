<template>
  <div class="bg-white mb-auto h-full shadow-lg p-3 mt-2 rounded-lg w-full">
    <div class="w-full">
      <span
        class="flex flex-row w-full justify-between border-b-2 font-bold mb-10 text-xl text-primary py-2"
      >
        Appointments
      </span>
    </div>
    <empty-state v-if="noAppointment" @openModal="openModal" />
    <existing-state v-else @openModal="openModal" />

    <book-appointment-modal
      v-model="appointmentModal"
      @close="appointmentModal = false"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import ChevronRightIcon from "@/components/icons/chevronrightorange.vue";
import ChevronLeftIcon from "@/components/icons/chevronleftorange.vue";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import EmptyState from "./emptyState.vue";
import ExistingState from "./existingState.vue";
import BookAppointmentModal from "./components/bookappointmentModal.vue";

@Options({
  name: "AppointmentPage",
  components: {
    ChevronRightIcon,
    ChevronLeftIcon,
    EmptyState,
    ExistingState,
    BookAppointmentModal,
  },
})
export default class AppointmentPage extends Vue {
  appointments: any = [];
  appointmentModal: Boolean = false;
  loading: Boolean = true;

  get noAppointment() {
    return this.appointments.length === 0;
  }

  openModal() {
    this.appointmentModal = true;
  }

  async fetchAppointments() {
    try {
      this.loading = true;
      const { data } = await cornieClient().get(
        "/api/v1/patient-portal/appointment/get-all-user-appointment"
      );
      this.appointments = data;
    } catch (error) {
      window.notify({
        msg: "There was an error fetching appointments",
        status: "error",
      });
    } finally {
      this.loading = false;
    }
  }

  async created() {
    await this.fetchAppointments();
  }
}
</script>

<style></style>
