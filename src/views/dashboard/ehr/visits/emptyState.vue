<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
    <img src="@/assets/img/newvisits.svg" />
    <h3 class="text-center font-bold mt-5">Patients are yet to visit your practice.</h3>
    <p class="text-center">
      Check in patients from your patients' register or from scheduled appointments to start a visit.
    </p>
    <button
      class="bg-danger rounded-lg text-white mt-5 py-2 px-8 focus:outline-none hover:opacity-90 font-semibold"
      @click="() => $emit('clicked')"
    >
      Check-In to Start
    </button>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import VisitIcon from "./components/empty-icon.vue";

@Options({
  components: {
    VisitIcon,
  },
})
export default class VisitEmptyState extends Vue {}
</script>
