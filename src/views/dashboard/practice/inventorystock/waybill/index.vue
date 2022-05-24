<template>
  <div class="h-full flex justify-center">
    <div class="w-full mx-5">
      <span class="w-full">
        <waybill-empty-state v-if="empty" />
        <waybill-existing-state v-else />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import WaybillEmptyState from "./emptyState.vue";
import WaybillExistingState from "./existingState.vue";
import IWaybill from "@/types/IWaybill";

const waybill = namespace("waybill");
const user = namespace("user");

@Options({
  name: "WaybillIndex",
  components: {
    WaybillEmptyState,
    WaybillExistingState,
  },
})
export default class WaybillIndex extends Vue {

  get empty() {
    return this.waybills.length < 1;
  }

  @user.Getter
  authCurrentLocation!: string;

  @waybill.State
  waybills!: IWaybill[];

  @waybill.Action
  fetchWaybillOutgoing!: (locationId: string) => Promise<void>;


   async created() {
    await this.fetchWaybillOutgoing(this.authCurrentLocation);
  }
}
</script>
