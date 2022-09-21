<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
    <img src="@/assets/visits.svg" />
    <h1 class="text-center text-lg mt-5 font-bold">
      You have not had any visits yet.
    </h1>
    <p class="text-gray-400 text-center">
      To schedule a visit explore and  instantly book  with your preferred provider.<br/>
      Want to book for a family member? Go to Profiles.

    </p>
    <span class="flex justify-center w-full">
      <button
              @click="showAppointment = true"
              class="bg-danger items-center flex space-x-4 justify-between rounded-md text-white font-semibold text-sm mt-5 py-3 px-8 focus:outline-none hover:opacity-90"
          >
              Book Appointment
          </button>
    </span>

  </div>
  <appointment-modal  v-model="showAppointment"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import AppointmentModal from "../../appointments/components/AppointmentModal.vue";


@Options({
  components: {
    AppointmentModal
  },
})
export default class visitemptyState extends Vue {
  showOrgModal = false;
  showAppointment = false;
}
</script>
