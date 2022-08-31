<template>
  <div class="pb-40">
    <div
      class="bg-white mb-auto h-full shadow-lg p-3 mt-2 rounded-lg w-full"
    >
      <div class="w-full">
        <span
          class="flex flex-row w-full justify-between border-b-2 font-bold mb-10 text-xl text-primary py-2"
        >
          Apppointments
        </span>
      </div>

    <div>
      <empty-state v-if="noAppointment" @openModal="openModal"/>
      <existing-state v-else  @openModal="openModal"/>
    </div>
    </div>

   <!-- <book-appointment-modal v-model="appointmentModal" @close="appointmentModal = false" />-->
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import ChevronRightIcon from "@/components/icons/chevronrightorange.vue";
import ChevronLeftIcon from "@/components/icons/chevronleftorange.vue";
import { namespace } from "vuex-class";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import EmptyState from './emptyState.vue';
import ExistingState from './existingState.vue';
//import BookAppointmentModal from './components/bookappointmentModal.vue';

@Options({
  name: "AppointmentPage",
  components: {
    ChevronRightIcon,
    ChevronLeftIcon,
    EmptyState,
    ExistingState,
    //BookAppointmentModal
  },
})
export default class AppointmentPage extends Vue {
  @Prop({ type: String, default: "" })
  id!: string;

  currentTab = 0;
  appointments = Array<any>;
  appointmentModal: Boolean = false;

  get noAppointment() {
    return this.appointments.length === 0
  }

  openModal() {
    this.appointmentModal = true
  }

  async created() {}
}
</script>

<style></style>
