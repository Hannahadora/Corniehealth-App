<template>
  <div
    class="flex justify-center bg-white mb-auto pb-72 h-full  shadow-lg p-3 mt-2 rounded-lg w-full">
    <div class="w-full">
      <span
        class="flex flex-col w-full justify-center border-b-2 font-bold mb-10 text-xl text-primary py-2"
      >
     Profile Settings
      </span>
      <span class="w-full">
        <tabs :items="tabLinks" v-model="currentTab">
            <profile-section/>
            <contact-section/>
            <payment-section/>
            <provider-section/>
            <security-section/>
            <notification-section />
            <association-section :id="id"/>
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
import { Prop, PropSync, Watch } from "vue-property-decorator";

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

  @Prop({ type: String, default: "" })
  id!: string;

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
