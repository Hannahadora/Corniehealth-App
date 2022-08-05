<template>
  <div class="w-full">

    <div class="pb-5">
      <div class="">
        <span class="text-sm mb-0 text-black font-bold">Account Type</span>
      <new-tab
        :items="tabLinks"
        v-model="currentTab"
        :width="'w-2/4 lg:w-1/4 sm:w-2/4'"
        class=""
      >
        <family-section/>
        <orgainzation-section />
    
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

import FamilySection from "./familytype/index.vue";
import OrgainzationSection from "./organization/index.vue";


const collectioncenter = namespace("collectioncenter");

@Options({
  name: "linkedAccounts",
  components: {
   cornieRadio,
   NewTab,
   FamilySection,
   OrgainzationSection,
  },
})
export default class linkedAccounts extends Vue {

    loading = false;

    tabLinks = ["Family", "Organisation"];

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
