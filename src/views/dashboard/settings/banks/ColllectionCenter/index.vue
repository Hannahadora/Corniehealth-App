<template>
  <div class="w-full mt-8">

    <div class="pb-5">
      <div class="">
      <new-tab
        :items="tabLinks"
        v-model="currentTab"
        :width="'w-2/4 lg:w-34 sm:w-2/4'"
        class="mt-12"
      >
        <private-section />
        <hmo-section />
        <self-section />
      </new-tab>
    </div>
    </div>


 
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import cornieRadio from "@/components/cornieradio.vue";
import NewTab from "@/components/newtab.vue";

import PrivateSection from "./private.vue";
import HmoSection from "./hmo.vue";
import SelfSection from "./selfaccount.vue";


import { namespace } from "vuex-class";

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
  
  created() {}
}
</script>
<style scoped>
.w-34 {
    width: 45%;
}
</style>