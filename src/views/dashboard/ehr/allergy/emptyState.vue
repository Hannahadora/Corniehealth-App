<template>
  <div class="w-full pb-80">  
    <div class="w-full flex flex-col justify-center items-center h-96">
        <img src="@/assets/img/allergy.svg" />
        <h3 class="text-center mt-5">
            No allergies.<br>
        [Benefit of adding new allergy to the system]
        </h3>
            <span class="flex justify-center w-full">
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
            font-semibold
            focus:outline-none
            hover:opacity-90
            "
            @click="showAllergy"
        >
           New Allergy
        </button>
            </span>
    </div>
         <allergy-modal   
        :columns="practitioner"
          @update:preferred="showAllergy"
          v-model="showAllergyModal"/>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import Select from "@/components/newautocomplete.vue";
import SearchIcon from "@/components/icons/search.vue";
import IconInput from "@/components/IconInput.vue";
import AllergyModal from "./allergydialog.vue";
@Options({
  components: {
    ChevronDownIcon,
    Select,
    SearchIcon,
    IconInput,
    AllergyModal,
  },
})
export default class AllergysEmptyState extends Vue {
   showAllergyModal= false;
 async showAllergy(){
      this.showAllergyModal = true;
  }
}
</script>
<style>
.outline-primary{
    border: 2px solid #080056;
}
</style>