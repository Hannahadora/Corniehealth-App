<template>
  <div
    class="flex justify-center pb-76 bg-white shadow-md p-3 mt-2 mb-2 rounded w-full"
  >
    <div class="w-full p-2 pb-96">
      <span
        class="flex flex-col w-full justify-center border-b-2 font-bold mb-10 text-xl text-primary py-2"
      >
        Care Team
      </span>
      <span class="w-full">
            <careteam-empty-state v-if="empty" />
        <careteam-existing-state v-else />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import ICareteam from "@/types/ICareteam";
import { Options, Vue } from "vue-class-component";
import CareteamEmptyState from "./emptyState.vue";
import CareteamExistingState from "./existingState.vue";
import { namespace } from "vuex-class";

const careteam = namespace("careteam");

@Options({
  name: "CareteamIndex",
  components: {
    CareteamEmptyState,
    CareteamExistingState,
  },
})
export default class CareteamIndex extends Vue {
  addCareteam = false;
  CareteamToUpdate = {} as ICareteam;

  get empty() {
    return this.careteams.length < 1;
  }

  @careteam.State
  careteams!: ICareteam[];

  @careteam.Action
  fetchCareteams!: () => Promise<void>;

  created() {
    this.fetchCareteams();
    if (this.careteams.length < 1) this.fetchCareteams();
  }
}
</script>
