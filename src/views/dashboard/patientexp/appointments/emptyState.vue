<template>
<div>
<div class="w-full flex flex-col justify-center items-center h-96">
    <img src="@/assets/img/appointment.svg" />
    <h3 class="text-center mt-5">There are no appointments on record!<br>
Schedule a new appointment by clicking on “Create Appointment” above</h3>
    <button
      class="
        bg-danger
        rounded-full
        text-white
        mt-5
        py-2
        px-3
        pl-12
        pr-12
        focus:outline-none
        hover:opacity-90
      "
       @click="$router.push('/dashboard/provider/experience/add-appointment')"
    >
      Create Appointment
    </button>
  </div>
</div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import Select from "@/components/newautocomplete.vue";
import SearchIcon from "@/components/icons/search.vue";
import IconInput from "@/components/IconInput.vue";
@Options({
  components: {
    ChevronDownIcon,
    Select,
    SearchIcon,
    IconInput
    
  },
})
export default class PracticeEmptyState extends Vue {}
</script>
