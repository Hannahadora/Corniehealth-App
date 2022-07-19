<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
    <img src="@/assets/img/special.svg" />
    <h3 class="text-center mt-5">No Specialties on Record</h3>
    <button
    @click="showSpecialModal = true"
      class="bg-danger rounded text-white mt-5 py-3 px-6 text-sm font-semibold focus:outline-none hover:opacity-90"
    >
      Add New Specialty
    </button>
  </div>
   <special-modal
    v-model="showSpecialModal"
    @special-added="specialadded"
  />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SpecialModal from './newspecial.vue';
import ISpecial from "@/types/ISpecial";
import { namespace } from "vuex-class";
import IPractitioner from "@/types/IPractitioner";

const special = namespace("special");
@Options({
  components: {
      SpecialModal
  },
})
export default class SpecialEmptyState extends Vue {
    showSpecialModal = false;

    @special.Action
  fetchSpecials!: () => Promise<void>;

   async specialadded(){
     await this.fetchSpecials();
  }
}
</script>
