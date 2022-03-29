<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
    <img src="@/assets/img/newvisits.svg" />
    <h3 class="text-center font-bold mt-5">Patients are yet to visit your practice.</h3>
    <p class="text-center">
      Check in patients from your patients' register or from scheduled appointments to start a visit.
    </p>
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
