<template>
  <div
    class="flex justify-center bg-white mb-32 h-full overflow-x-hidden overflow-y-scroll shadow-lg p-6 mt-2 rounded-lg w-full"
  >
    <div class="w-full">
      <span
        class="flex flex-col w-full justify-center border-b-2 font-bold mb-10 text-2xl text-primary py-2"
      >
       Private Profile & Settings
      </span>
      <span class="w-full">
        <tabs :items="tabLinks" v-model="currentTab">
            <profile-section/>
            <contact-section/>
            <payment-section/>
            <provider-section/>
            <security-section/>
            <notification-section />
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

import AssociationSection from "./association/index.vue";
import ProfileSection from "./accountprofile/index.vue";
import ContactSection from "./contact/index.vue";
import PaymentSection from "./paymentaccount/index.vue";
import ProviderSection from "./providers/index.vue";
//import ProviderSection from "./providers/existingState.vue";
import SecuritySection from "./security/index.vue";
import NotificationSection from "./notifications/index.vue";




@Options({
  name: "AccountSettings",
  components: {
    Tabs,
    ChevronRightIcon,
    ChevronLeftIcon,
    AssociationSection,
    ProfileSection,
    ContactSection,
    PaymentSection,
    ProviderSection,
    SecuritySection,
    NotificationSection

  },
})
export default class AccountSettings extends Vue {
  tabLinks = [
    "Account Profile",
    "Contact",
    "Payment Accounts",
    "Providers",
    "Security",
    "Notifications",
    "Linked Accounts",
  ];
  currentTab = 0;

  async created(){
  
  }
}
</script>

<style></style>
