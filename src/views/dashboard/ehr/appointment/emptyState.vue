<template>
  <div class="w-full pb-80">
    <ul class="nav nav-tabs nav-tabs-bottom widget_categories">
      <li class="nav-item cursor-pointer">
        <a
          class="nav-link"
          @click="select(1)"
          :class="{ active: selected === 1 }"
          :aria-selected="selected === 1"
          >Appointments</a
        >
      </li>
      <li class="nav-item cursor-pointer">
        <a
          class="nav-link"
          @click="select(2)"
          :class="{ active: selected === 2 }"
          :aria-selected="selected === 2"
          >Visits</a
        >
      </li>
    </ul>
    <div class="tab-content">
      <div
        class="tab-pane"
        v-if="selected == 1"
        :class="{ active: selected === 1 }"
        id="appointments"
      >
        <div class="w-full flex flex-col justify-center items-center h-96">
          <img src="@/assets/ehrappointment.svg" />
          <h3 class="text-center mt-5">
            There are no appointments on record <br />
            Schedule a new appointment by clicking the button below
          </h3>
          <span class="flex justify-center w-full">
            <button
              class="bg-danger rounded-full text-white mt-5 py-2 px-3 pl-12 pr-12 font-semibold focus:outline-none hover:opacity-90"
              @click="showAppointment"
            >
              New Appointment
            </button>
          </span>
        </div>
      </div>
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
