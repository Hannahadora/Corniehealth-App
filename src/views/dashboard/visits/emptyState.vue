<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
    <img src="@/assets/img/newvisits.svg" />
    <h3 class="text-center font-bold mt-5">Patients are yet to visit your practice.</h3>
    <p class="text-center">
      Check in patients from your patients' register or from scheduled appointments to start a visit.
    </p>
     <cornie-menu top="30px" right="100%">
      <template #activator="{ on }">
          <icon-btn v-on="on">
              <button
                class="bg-danger rounded-lg text-white mt-5 py-2 px-8 focus:outline-none hover:opacity-90 font-semibold inline-flex"
                @click="() => $emit('clicked')"
              >
                  <span class="mr-1">Check-In to Start </span>
                  <chevron-down-icon
                    class="text-white mb-2 stroke-current mt-2 ml-1"
                  />
              </button>
          </icon-btn>
      </template>
      <card-text>
        <div class="p-2 w-full hover:bg-gray-100 p-3 cursor-pointer" @click="showPatient">
          <span class="ml-3 text-xs">Check-In from Patients Register</span>
        </div>
        <div class="p-2 w-full flex hover:bg-gray-100 p-3 cursor-pointer">
          <span class="ml-3 text-xs">Check-In from Scheduled Appointments</span>
        </div>
      </card-text>
      </cornie-menu>
  </div>
  <patient-search v-model="showPatientModal"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Select from "@/components/formselect.vue";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import CornieMenu from "@/components/dynamicCornieMenu.vue";
import { namespace } from "vuex-class";
import PatientSearch from "./components/searchPatient.vue"

const patients = namespace("patients");

@Options({
  components: {
    Select,
    ChevronDownIcon,
    CornieMenu,
    PatientSearch
  },
})
export default class VisitEmptyState extends Vue {
  visitType = "";
  showPatientModal = false;


  showPatient(){
      this.showPatientModal = true;
  }
 

}
</script>
<style>
.dropdown:hover .dropdown-menu {
  display: block;
}

</style>
