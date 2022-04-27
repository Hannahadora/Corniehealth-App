<template>
  <div class="h-full flex justify-center">
    <div class="w-full mx-5">
      <span class="w-full">
        <inventory-location-empty-state v-if="empty" />
        <inventory-location-existing-state v-else />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import inventoryLocationEmptyState from "./emptyState.vue";
import inventoryLocationExistingState from "./existingState.vue";

@Options({
  components: {
    inventoryLocationEmptyState,
    inventoryLocationExistingState
  }
})

export default class InventoryLocationIndex extends Vue {
  empty = true
}
</script>