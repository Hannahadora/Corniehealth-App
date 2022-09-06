<template>
  <div class="w-full pt-32 pb-64">
    <div class="w-full flex flex-col justify-center items-center h-96">
      <no-appointment />
      <h3 class="text-2xl mt-8 text-center font-bold">
        You don’t have any appointments.
      </h3>
      <p class="text-center mt-2">
        Explore and instantly book<br />
        with your preferred provider for you or for a family member.
      </p>
      <span class="flex justify-center w-full">
        <button @click="$emit('openModal')"
          class="bg-danger rounded-lg text-white mt-8 py-3 px-6 pl-12 pr-12 font-semibold focus:outline-none hover:opacity-90"
        >
          Book Appointment
        </button>
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import NoAppointment from "@/components/icons/no-appointment.vue";
import { namespace } from "vuex-class";

const appointment = namespace("appointment");
@Options({
  components: {
    NoAppointment,
  },
})
export default class AppointmentEmptyState extends Vue {

}
</script>
<style>
.outline-primary {
  border: 2px solid #080056;
}
</style>
