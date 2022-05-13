<template>
  <div class="h-full flex justify-center">
    <div class="w-full mx-5">
      <span class="w-full">
        <request-empty-state v-if="empty" />
        <request-existing-state v-else />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import RequestEmptyState from "./emptyState.vue";
import RequestExistingState from "./existingState.vue";
import IMaterialRequest from "@/types/IMaterialRequest";

const materialrequest = namespace("materialrequest");
const user = namespace("user");


@Options({
  name: "RequestIndex",
  components: {
    RequestEmptyState,
    RequestExistingState,
  },
})
export default class RequestIndex extends Vue {

  get empty() {
    return this.materialrequests.length < 1;
  }

  @user.Getter
  authCurrentLocation!: string;

  @materialrequest.State
  materialrequests!: IMaterialRequest[];

  @materialrequest.Action
  fetchInventorystocks!: (locationId: string) => Promise<void>;


  async created() {
     if (this.authCurrentLocation) await this.fetchInventorystocks(this.authCurrentLocation);
  }
}
</script>
