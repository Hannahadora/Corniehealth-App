<template>
  <div class="flex justify-center  bg-white shadow-md p-3 mb-2 rounded w-full">
    <div class="w-full">
    <span
        class="
          flex
          flex-col
          w-full
          justify-center
          border-b-2
          font-bold
          mb-10
          text-xl text-primary
            py-2
        "
      >
      Allergy & Intolerance
      </span>
      <span class="w-full h-screen">
          <medication-empty-state
                v-if="empty"
          />
          <medication-existing-state
        @allergy-added="allergyAdded"
        :allergys="allergys"
          v-else

          />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import IAllergy from "@/types/IAllergy";
import { Options, Vue } from "vue-class-component";
import MedicationEmptyState from "./emptyState.vue";
import MedicationExistingState from "./existingState.vue";
import { namespace } from "vuex-class";

const allergy = namespace("allergy");

@Options({
  name: "AllergysIndex",
  components: {
    MedicationEmptyState,
    MedicationExistingState,
  },
})
export default class AllergysIndex extends Vue {
  addAllergy = false;
  show=false;
  TaskToUpdate = {} as IAllergy;

  get empty() {
    return this.allergys.length < 1;
  }

 @allergy.State
  allergys!: IAllergy[];

  @allergy.Action
  fetchAllergys!: () => Promise<void>;


  allergyAdded() {
    this.show = false;
 this.allergys;
  this.fetchAllergys();
  }

mounted(){
  this.fetchAllergys();
}

created() {
    if (this.allergys.length < 1) this.fetchAllergys();
  }
}
</script>
