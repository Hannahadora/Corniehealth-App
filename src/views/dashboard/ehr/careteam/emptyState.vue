<template>
  <div class="w-full flex flex-col justify-center items-center">
    <img src="@/assets/img/empty-careteam.svg" />
    <div class="flex flex-col justify-center items-center">
      <h3 class="text-center mt-5 font-bold">No care teams on record</h3>
      <p class="text-xs text-gray-400">
        Care teams added will be displayed here.
      </p>
    </div>
    <button
      class="bg-danger rounded-lg font-semibold text-sm text-white mt-5 py-2 px-4 focus:outline-none hover:opacity-90"
      @click="showCareTeam = true"
    >
      Create a Care Team
    </button>
  </div>
  <careteam-modal v-model="showCareTeam" @careteam-added="careteamadded"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CareteamModal from "./teamDialog.vue";
import { namespace } from "vuex-class";

import ICareteam from "@/types/ICareteam";

const careteam = namespace("careteam");
@Options({
  components: { CareteamModal },
})
export default class CareTeamEmptyState extends Vue {
  showCareTeam = false;

  @careteam.Action
  fetchCareteams!: () => Promise<void>;

  async careteamadded(){
    await this.fetchCareteams();
  }
}
</script>
