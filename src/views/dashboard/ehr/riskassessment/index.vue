<template>
  <div
    class="flex justify-center bg-white shadow-md p-3 mb-2 rounded-3xl w-full"
  >
    <div class="w-full">
      <span
        class="flex flex-col w-full justify-center border-b-2 font-bold mb-10 text-xl text-dye py-2"
      >
        Allergy & Intolerance
      </span>
      <span class="w-full h-screen">
        <!-- <allergys-empty-state v-if="empty" />
        <allergys-existing-state
          @allergy-added="allergyAdded"
          :allergys="allergys"
          v-else
        /> -->

        <!-- <allergys-empty-state v-if="empty" /> -->
        <allergys-existing-state
          @allergy-added="allergyAdded"
          :allergys="allergys"
        />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import IAllergy from "@/types/IAllergy";
import { Options, Vue } from "vue-class-component";
import AllergysEmptyState from "./emptyState.vue";
import AllergysExistingState from "./existingState.vue";
import { namespace } from "vuex-class";

const allergy = namespace("allergy");

@Options({
  name: "RiskIndex",
  components: {
    AllergysEmptyState,
    AllergysExistingState,
  },
})
export default class RiskIndex extends Vue {
  addAllergy = false;
  show = false;
  TaskToUpdate = {} as IAllergy;

  get empty() {
    return this.allergys.length < 1;
  }
  get activePatientId() {
    const id = this.$route?.params?.id as string;
    return id;
  }

  @allergy.State
  allergys!: IAllergy[];

  @allergy.Action
  fetchAllergys!: (patientId: string) => Promise<void>;

  allergyAdded() {
    this.show = false;
    this.allergys;
    this.fetchAllergys(this.activePatientId);
  }

  mounted() {
    this.fetchAllergys(this.activePatientId);
  }

  created() {
    if (this.allergys.length < 1) this.fetchAllergys(this.activePatientId);
  }
}
</script>
