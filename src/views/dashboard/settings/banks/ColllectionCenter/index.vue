<template>
  <div class="w-full">

    <div class="pb-5">
      <div class="">
      <new-tab
        :items="tabLinks"
        v-model="currentTab"
        :width="'w-2/4 lg:w-34 sm:w-2/4'"
        class="mt-8"
      >
        <private-section @collectioncenterAdded="collectioncenterAdded" :id="collectionCenterId?.id" :selectedItem="collectionCenterId"/>
        <hmo-section @collectioncenterAdded="collectioncenterAdded" :id="collectionCenterId?.id" :selectedItem="collectionCenterId"/>
        <self-section @collectioncenterAdded="collectioncenterAdded" :id="collectionCenterId?.id" :selectedItem="collectionCenterId"/>
      </new-tab>
    </div>
    </div>


 
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class"; 

import ICollectionCenters from "@/types/ICollectionCenters";

import cornieRadio from "@/components/cornieradio.vue";
import NewTab from "@/components/newtab.vue";
import PrivateSection from "./private.vue";
import HmoSection from "./hmo.vue";
import SelfSection from "./selfaccount.vue";

const collectioncenter = namespace("collectioncenter");

@Options({
  name: "CollectionCenterIndex",
  components: {
   cornieRadio,
   NewTab,
   PrivateSection,
   HmoSection,
   SelfSection
  },
})
export default class CollectionCenterIndex extends Vue {

    loading = false;

    tabLinks = ["Private (Out-of-Pocket)", "HMO","Self-Funded Accounts"];

    currentTab = 0;

    submit(){

    }
  
    @collectioncenter.Action
    fetchCollectionCenters!: () => Promise<void>;

    @collectioncenter.State
    collectioncenters!: ICollectionCenters[];

    async collectioncenterAdded(){
        await this.fetchCollectionCenters();
    }

    get collectionCenterId(){
      return this.collectioncenters?.flatMap((collection) => collection).find((center) => center) as any
    }

  async created() {
      await this.fetchCollectionCenters();
  }
}
</script>
<style scoped>
.w-34 {
    width: 45%;
}
</style>