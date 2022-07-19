<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
    <img src="@/assets/img/empty-careteam.svg" />
    <div class="flex flex-col justify-center items-center">
      <h3 class="text-center mt-5 font-bold">No care teams on record</h3>
      <p class="text-xs text-gray-400">
        Care teams added will be displayed here.
      </p>
    </div>
  </div>
  <careteam-modal v-model="showCareTeam"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CareteamModal from "./teamDialog.vue";

@Options({
  components: { CareteamModal },
})
export default class CareTeamEmptyState extends Vue {
  showCareTeam = false;
}
</script>
