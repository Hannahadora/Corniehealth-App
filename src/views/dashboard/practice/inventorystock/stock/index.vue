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
import IInventroyStock from "@/types/IInventroyStock";

const inventorystock = namespace("inventorystock");
const user = namespace("user");

@Options({
  name: "InventoryIndex",
  components: {
    InventoryEmptyState,
    InventoryExistingState,
  },
})
export default class InventoryIndex extends Vue {

  @user.Getter
  authCurrentLocation!: string;

  get empty() {
    return this.inventorystocks.length < 1;
  }

  @inventorystock.State
  inventorystocks!: IInventroyStock[];

  @inventorystock.Action
  fetchInventorystocks!: (locationId: string) => Promise<void>;


  async created() {
    if(this.authCurrentLocation) await this.fetchInventorystocks(this.authCurrentLocation);
  }
}
</script>
