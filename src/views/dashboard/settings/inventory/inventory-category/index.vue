<template>
  <div class="h-full flex justify-center">
    <div class="w-full mx-5">
      <span class="w-full">
        <inventory-category-empty-state v-if="empty" />
        <inventory-category-existing-state v-else />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import inventoryCategoryEmptyState from "./emptyState.vue";
import inventoryCategoryExistingState from "./existingState.vue";

@Options({
  components: {
    inventoryCategoryEmptyState,
    inventoryCategoryExistingState
  }
})

export default class InventoryCategoryIndex extends Vue {
  empty = true
}
</script>