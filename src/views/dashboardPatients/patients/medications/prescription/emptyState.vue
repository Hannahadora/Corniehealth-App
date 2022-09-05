<template>
    <div class="w-full pt-32 pb-64">
      <div class="w-full flex flex-col justify-center items-center h-96">
        <img src="@/assets/img/no-impression.svg" alt="">
        <h3 class="text-2xl mt-8 text-center font-bold">
          No prescriptions on record
        </h3>
        <p class="text-center mt-2">
          You currently don't have any pending prescription.
        </p>
        <span class="flex justify-center w-full">
          <button @click="$emit('openModal')"
            class="bg-danger rounded-lg text-white mt-8 py-3 px-6 pl-12 pr-12 font-semibold focus:outline-none hover:opacity-90"
          >
            Upload Prescription
          </button>
        </span>
      </div>
    </div>
  </template>
  <script lang="ts">
  import { Options, Vue } from "vue-class-component";
  import NoAppointment from "@/components/icons/no-appointment.vue";
  import { namespace } from "vuex-class";
  
//   const appointment = namespace("appointment");
  @Options({
    components: {
      NoAppointment,
    },
  })
  export default class PrescriptionEmptyState extends Vue {
  
  }
  </script>
  <style>
  .outline-primary {
    border: 2px solid #080056;
  }
  </style>
  