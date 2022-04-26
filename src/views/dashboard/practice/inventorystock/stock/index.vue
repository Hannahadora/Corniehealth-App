<template>
  <div class="h-full flex justify-center">
    <div class="w-full mx-5">
      <span class="w-full">
        <inventory-empty-state v-if="empty" />
        <inventory-existing-state v-else />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import InventoryEmptyState from "./emptyState.vue";
import InventoryExistingState from "./existingState.vue";
import IRequest from "@/types/IRequest";

const request = namespace("request");

@Options({
  name: "InventoryIndex",
  components: {
    InventoryEmptyState,
    InventoryExistingState,
  },
})
export default class InventoryIndex extends Vue {

  get empty() {
    return this.requests.length < 1;
  }

  @request.State
  requests!: IRequest[];

  @request.Action
  fetchRequests!: () => Promise<void>;


  async created() {
    await this.fetchRequests();
  }
}
</script>
