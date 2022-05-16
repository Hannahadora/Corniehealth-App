<template>
  <div
    class="flex justify-center bg-white mb-32 shadow-md p-3 mt-2 rounded w-full"
  >
    <div class="w-full">
      <span
        class="flex flex-col w-full justify-center border-b-2 font-bold mb-10 text-lg text-primary py-2"
      >
       My Inventory
      </span>
   

      <span class="w-full h-screen">
          <tabs :items="tabLinks" v-model="currentTab">
            <stock-section/>
            <goods-section />
            <requestmaterial-section />
            <materialreturn-section />
            <waybill-section />
          </tabs>
        
      </span>
    </div>
  </div>


</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";

import ICatalogueService, { ICatalogueProduct } from "@/types/ICatalogue";

import Tabs from "@/components/tabs.vue";

import StockSection from "./stock/index.vue";
import GoodsSection from "./goods/index.vue";
import MaterialreturnSection from "./materialreturn/index.vue";
import RequestmaterialSection from "./materialrequest/index.vue";
import WaybillSection from "./waybill/index.vue";

const catalogue = namespace("catalogues");

@Options({
  name: "InventoryExistingState",
  components: {
    Tabs,
    StockSection,
    GoodsSection,
    MaterialreturnSection,
    RequestmaterialSection,
    WaybillSection
  },
})
export default class CDMExistingState extends Vue {
  @catalogue.Action
  getServices!: () => Promise<void>;

  @catalogue.State
  services!: ICatalogueService[];

  @catalogue.State
  products!: ICatalogueProduct[];

  @catalogue.Action
  getProducts!: () => Promise<void>;

  activeTab = 0;

  
  tabLinks = [
    "Inventory Stock",
    "Goods Received Note",
    "Material Request",
    "Material Return",
    "Waybill"
  ];
  currentTab = 0;

 
  async created() {
   await this.getServices();
   await this.getProducts();
  }
}
</script>
