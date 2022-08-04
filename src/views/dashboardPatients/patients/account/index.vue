<template>
  <div
    class="flex justify-center bg-white mb-32 h-full shadow-lg p-3 mt-2 rounded-lg w-full"
  >
    <div class="w-full">
      <span
        class="flex flex-col w-full justify-center border-b-2 font-bold mb-10 text-2xl text-primary py-2"
      >
       Private Profile & Settings
      </span>
      <span class="w-full h-screen">
        <tabs :items="tabLinks" v-model="currentTab">
         <association-section/>
        </tabs>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import Tabs from "@/components/tabs.vue";
import ChevronRightIcon from "@/components/icons/chevronrightorange.vue";
import ChevronLeftIcon from "@/components/icons/chevronleftorange.vue";
import { namespace } from "vuex-class";

import AssociationSection from "../association/index.vue";



@Options({
  name: "AccountSettings",
  components: {
    Tabs,
    ChevronRightIcon,
    ChevronLeftIcon,
    AssociationSection

  },
})
export default class AccountSettings extends Vue {
  tabLinks = [
    "Account Profile",
    "Contact",
    "Association",
    "Payment Accounts",
    "Providers",
    "Security",
    "Notifications",
  ];
  currentTab = 0;

  async created(){
  
  }
}
</script>

<style></style>
