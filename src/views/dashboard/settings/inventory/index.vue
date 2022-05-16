<template>
  <div class="flex justify-center bg-white mb-32 shadow-md p-3 mt-2 rounded w-full">
    <div class="w-full">
      <span class="flex flex-col w-full justify-center border-b-2 font-bold mb-10 text-lg text-primary py-2">
        Inventory
      </span>
      <span class="w-full h-screen">
        <tabs :items="tabLinks" v-model="currentTab">
          <inventory-valuation-index />
        </tabs>
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

import Tabs from "@/components/tabs.vue";
import InventoryCategoryIndex from "./inventory-category/index.vue";
import InventoryLocationIndex from "./inventory-location/index.vue";
import InventoryValuationIndex from './inventory-valuation/index.vue'

@Options({
  components: {
    Tabs,
    InventoryCategoryIndex,
    InventoryLocationIndex,
    InventoryValuationIndex
  }
})

export default class InventoryIndex extends Vue {
  tabLinks = [
    "Inventory valuation"
  ];
  currentTab = 0
}
</script>