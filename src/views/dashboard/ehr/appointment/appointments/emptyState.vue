<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
    <img src="@/assets/img/practitioners.svg" />
    <p class="text-center">
      There are no appointments on record. <br />
    Schedule a new appointment by viewing a practitioner on the availability section
    </p>
    <!-- <button
      class="bg-danger rounded text-white mt-5 py-3 px-6 text-sm font-semibold focus:outline-none hover:opacity-90"
     @click="showAppointmentModal = true"
    >
      Create
    </button> -->
  </div>
   <appointment-modal  v-model="showAppointmentModal"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AppointmentModal from './addAppointmentModal.vue';
import { namespace } from "vuex-class";


const appointment = namespace("appointment");

@Options({
  components: {
    AppointmentModal
  },
})
export default class AppointmentEmptyState extends Vue {
  showAppointmentModal = false;
}
</script>
