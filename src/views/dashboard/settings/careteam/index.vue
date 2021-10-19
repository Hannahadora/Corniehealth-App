<template>
  <div class="h-full flex justify-center">
    <div class="w-full">
    <span class="flex border-b-2 w-full font-semibold text-xl text-primary py-2 mx-auto">
       Care Teams
    </span>
      <span class="w-full">
          <careteam-empty-state
                v-if="empty"
          />
          <careteam-existing-state
          v-else
          />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import ICareteam from "@/types/ICareteam";
import { Options, Vue } from "vue-class-component";
import CareteamEmptyState from "./emptyState.vue";
import CareteamExistingState from "./existingState.vue";
import addCareteam from "./addCareteam.vue";
import { namespace } from "vuex-class";

const careteam = namespace("careteam");

@Options({
  name: "CareteamIndex",
  components: {
    CareteamEmptyState,
    CareteamExistingState,
    addCareteam,
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
