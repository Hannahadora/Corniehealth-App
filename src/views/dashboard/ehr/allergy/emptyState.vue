<template>
  <div class="w-full pb-80">
    <div class="w-full flex flex-col justify-center items-center h-96">
      <img src="@/assets/img/allergy.svg" />
      <h2 class="text-center text-lg  mt-5 font-bold">
        Patient currently have no allergies
      </h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum aenean mattis mi diam eget.
      </p>
      <span class="flex justify-center w-full">
        <button
          class="bg-danger rounded-lg text-white mt-5 py-2 px-8 font-semibold focus:outline-none hover:opacity-90"
          @click="showAllergy"
        >
         New Allergy
        </button>
      </span>
    </div>
    <allergy-modal v-model="showAllergyModal" />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import Select from "@/components/newautocomplete.vue";
import SearchIcon from "@/components/icons/search.vue";
import IconInput from "@/components/IconInput.vue";
import AllergyModal from "./allergyModal.vue";
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
  showAllergyModal = false;
  async showAllergy() {
    this.showAllergyModal = true;
  }
}
</script>
<style>
.outline-primary {
  border: 2px solid #080056;
}
</style>
