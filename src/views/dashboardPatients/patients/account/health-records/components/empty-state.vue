<template>
  <div
    class="flex flex-col justify-center text-center w-full h-full pt-40 items-center"
  >
    <div class="self-center">
      <!-- <empty-icon /> -->
      <img src="@/assets/img/nohealthRecord.svg" />
    </div>
    <div class="font-bold text-xl mt-3">No Health Data to Display</div>
    <p class="text-gray-600 text-sm pt-2">
      Your records will be updated as soon as you consult with a doctor.
    </p>
    <p class="text-gray-600 text-sm pt-2">
      Register with your preferred practice (Hospital, Clinic or Solo Practice)
      or book a doctor's appointment.
    </p>
    <div></div>
    <div class="flex flex-col pt-5">
      <div></div>
      <div
        class="flex flex-col space-y-4 md:flex-row md:space-x-7 md:space-y-0"
      >
        <div
          @click="addPractice"
          class="border-primary border p-2 rounded-xl text-primary font-bold px-8 py-3 mx-2 cursor-pointer"
        >
          Add/Invite a Practice
        </div>
        <div
          @click="bookAppointment"
          class="bg-danger p-2 rounded-xl text-white font-bold px-8 py-3 mx-2 cursor-pointer"
        >
          Book an appointment
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Options, Vue } from "vue-class-component";
  // import EmptyIcon from "./empty-icon.vue";

  @Options({
    components: {
      // EmptyIcon,
    },
    emits: ["addPractice", "bookAnAppointment"],
  })
  export default class EmptyState extends Vue {
    addPractice() {
      this.$emit("addPractice");
    }
    bookAppointment() {
      this.$emit("bookAnAppointment");
    }
  }
</script>
