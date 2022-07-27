<template>
  <div>
    <div class="h-full flex justify-center pb-5">
      <div class="w-full">
        <span class="flex flex-col w-full font-semibold py-2 mx-auto pb-4">
          <span
            class="flex border-b-2 w-full font-semibold text-xl text-primary py-2 mx-auto"
          >
            Billing & Collections
          </span>
          <span class="w-full h-screen">
              <tabs :items="tabLinks" v-model="currentTab">
                <product-section/>
                <service-section />
              </tabs>
            
          </span>
          <span class="flex w-full font-semibold py-2 mx-auto mt-4">
            <span
              class="flex px-3 py-2 border-b-4 cursor-pointer hover:bg-gray-300 hover:bg-opacity-20"
              @click="active = i"
              v-for="(tab, i) in tabs"
              :key="i"
              :class="isActive(i) ? ['border-danger'] : []"
            >
              {{ tab }}
            </span>
            <span class="flex px-3 pb-2 border-b-4 flex-grow"></span>
          </span>
        </span>
        <div>
          <payment v-if="active == 0" />
          <collection v-if="active == 1" />
          <currency-conversion v-if="active == 2" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";

import Payment from "./Payment/payment.vue";
import Collection from "./Collection/collections.vue";
import CurrencyConversion from "./CurrencyConversion/currencyConversion.vue";
import Tabs from "@/components/tabs.vue";


@Options({
  name: "BillingCollections",
  components: {
    Collection,
    Payment,
    CurrencyConversion,
    Tabs
  },
})
export default class  BillingCollections extends Vue {
  activeTab = 0;

   
  tabLinks = [
    "Billing Centers",
    "Collection Centers",
    "Accounts",
    "Associations",
    "Conversion Rates",
    "Billing Support",
  ];
  currentTab = 0;

 
  async created() {
 
  }
}
</script>
