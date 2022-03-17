<template>
  <div class="w-full pb-80">
    <div class="w-full flex flex-col justify-center items-center h-96">
          <img src="@/assets/ehrappointment.svg" />
          <h3 class="text-center mt-5">
            There are no appointments on record <br />
            Schedule a new appointment by clicking the button below
          </h3>
          <span class="flex justify-center w-full">
            <button
              class="bg-danger rounded-lg text-white mt-5 py-2 px-3 pl-12 pr-12 font-semibold focus:outline-none hover:opacity-90"
              @click="showAppointment"
            >
              New Appointment
            </button>
          </span>
        </div>

    <appointment-modal v-model="showAppointmentModal" />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import Select from "@/components/newautocomplete.vue";
import SearchIcon from "@/components/icons/search.vue";
import IconInput from "@/components/IconInput.vue";
import AppointmentModal from "./appointmentDialog.vue";
@Options({
  components: {
    ChevronDownIcon,
    Select,
    SearchIcon,
    IconInput,
    AppointmentModal,
  },
})
export default class AppointmentEmptyState extends Vue {
  showAppointmentModal = false;
  selected = 1;
  async showAppointment() {
    this.showAppointmentModal = true;
  }

  select(i: number) {
    this.selected = i;
  }
}
</script>
<style>
.outline-primary {
  border: 2px solid #080056;
}
</style>
