<template>
  <div
    class="flex justify-center  p-3 mt-2 mb-2 w-full"
  >
    <div class="w-full">
      <span
        class="flex flex-col w-full justify-center border-b-2 font-bold mb-10 text-xl text-primary py-2"
      >
         Billing & Collections
      </span>
       <span class="w-full h-screen">
              <tabs :items="tabLinks" v-model="currentTab">
                <billing-section/>
                <collection-section />
                <account-section />
                <associate-section/>
                <conversion-section/>
              </tabs>
            
          </span>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import BankAccountsExistingState from "./exisitingState.vue";
import { namespace } from "vuex-class";

import BillingSection from "./BillingCenter/index.vue";
import CollectionSection from "./ColllectionCenter/index.vue";
import AccountSection from "./Accounts/index.vue";
import AssociateSection from "./Associations/index.vue";
import ConversionSection from "./conversion/index.vue";

import Tabs from "@/components/tabs.vue";

@Options({
  name: "BillingCollectionsIndex",
  components: {
    Tabs,
    BankAccountsExistingState,
    BillingSection,
    CollectionSection,
    AccountSection,
    AssociateSection,
    ConversionSection
  },
})
export default class BillingCollectionsIndex extends Vue {
   tabLinks = [
    "Billing Centers",
    "Collection Centers",
    "Accounts",
    "Associations",
    "Conversion Rates",
    "Billing Support",
  ];
  currentTab = 0;

  created() {}
}
</script>
