<template>
  <div class="flex justify-center bg-white shadow-md p-3 mb-2 rounded w-full">
    <div class="w-full">
      <span
        class="flex flex-col w-full justify-center border-b-2 font-bold mb-10 text-xl text-dye py-2"
      >
        Allergy Intolerance
      </span>
      <span class="w-full h-screen">
        <allergys-empty-state v-if="empty"></allergys-empty-state>
        <allergys-existing-state
    
          v-else
        />

        <!-- <allergys-empty-state v-if="empty" /> -->
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import IAllergy from "@/types/IAllergy";
import Ihistory from "@/types/Ihistory";
import { Options, Vue } from "vue-class-component";
import AllergysEmptyState from "./emptyState.vue";
import AllergysExistingState from "./existingState.vue";
import { namespace } from "vuex-class";

const allergy = namespace("allergy");
const history = namespace("history");

@Options({
  name: "AllergysIndex",
  components: {
    AllergysEmptyState,
    AllergysExistingState,
  },
})
export default class AllergysIndex extends Vue {
  addAllergy = false;
  show = false;
  TaskToUpdate = {} as IAllergy;

  get empty() {
    return this.allergys.length < 1;
  }

  get activePatientId() {
    return this.$route.params.id as string;
  }

  @allergy.State
  allergys!: IAllergy[];

  @allergy.Action
  fetchAllergys!: (patientId: string) => Promise<void>;

  async allergyAdded() {
    this.show = false;
    await this.fetchAllergys(this.activePatientId);
  }
  mounted(){
    this.fetchAllergys(this.activePatientId);
  }

  //  created() {

  //      this.fetchAllergys(this.activePatientId);
  // }
}
</script>
