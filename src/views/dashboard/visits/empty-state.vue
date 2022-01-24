<template>
  <div class="w-full mb-8">
    <div class="w-full border-b-2 curved flex py-2">
      <div class="container-fluid flex font-semibold text-xl py-2">
        <h2>New Visits</h2>
      </div>
    </div>
  </div>

  <div class="w-full flex flex-col justify-center items-center h-96">
    <!-- <img src="@/assets/img/empty-domain.svg" /> -->
    <VisitIcon />
    <h3 class="text-center mt-5">There are no active visits</h3>
    <h3 class="text-center">
      Schedule a new appointment by clicking on Create Appointment below
    </h3>
    <button
      class="bg-danger rounded-md text-white mt-5 py-2 px-3 focus:outline-none hover:opacity-90 font-semibold"
      @click="$router.push({ name: 'Create Appointment' })"
    >
      Create Appointment
    </button>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import VisitIcon from "@/components/icons/empty-visits.vue";

@Options({
  components: {
    VisitIcon,
  },
})
export default class DomainEmptyState extends Vue {}
</script>
