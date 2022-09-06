<template>
  <div
    class="flex justify-center bg-white mb-auto pb-72 h-full shadow-lg p-3 mt-2 rounded-lg w-full"
  >
    <div class="w-full">
      <span
        class="flex flex-col w-full justify-center border-b-2 font-bold mb-10 text-xl text-primary py-2"
      >
        Billing and Payment
      </span>
      <span class="w-full">
        <tabs :items="tabLinks" v-model="currentTab">
          <billing-account-overview />
          <claims-bills />
          <pending-bills />
          <unbilled-encounters />
          <paid-bills />
        </tabs>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
  import ChevronLeftIcon from "@/components/icons/chevronleftorange.vue";
  import ChevronRightIcon from "@/components/icons/chevronrightorange.vue";
  import Tabs from "@/components/tabs.vue";
  import { Options, Vue } from "vue-class-component";
  import { Prop } from "vue-property-decorator";

  import ClaimsBills from "./claims/index.vue";
  import BillingAccountOverview from "./overview/index.vue";
  import PaidBills from "./paid/paidBills.vue";
  import PendingBills from "./pending-bills/index.vue";
  import unbilledEncounters from "./unbilled/index.vue";
  @Options({
    name: "AccountSettings",
    components: {
      Tabs,
      ChevronRightIcon,
      ChevronLeftIcon,
      ClaimsBills,
      BillingAccountOverview,
      PaidBills,
      PendingBills,
      unbilledEncounters,
    },
  })
  export default class AccountSettings extends Vue {
    @Prop({ type: String, default: "" })
    id!: string;

    tabLinks = [
      "Overview",
      "Claims",
      "Pending Bills",
      "Unbilled Encounter",
      "Paid Bills",
    ];
    currentTab = 0;

    async created() {}
  }
</script>

<style></style>
