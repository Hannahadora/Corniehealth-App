<template>
  <div
    class="flex justify-center bg-white mb-32 shadow-md p-3 mt-2 rounded w-full"
  >
    <div class="w-full">
      <span
        class="flex flex-col w-full justify-center border-b-2 font-bold mb-10 text-lg text-primary py-2"
      >
        Billing Profile
      </span>
      <span class="w-full h-screen">
        <tabs :items="tabLinks" v-model="currentTab">
          <overview @newBill="showBillModal" />
          <pending-bills @newBill="showBillModal" />
          <unbilled-encounters @newBill="showBillModal" />
          <paid-bills @newBill="showBillModal" />
        </tabs>
        <new-bill v-model="showNewBill" />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
  import Tabs from "@/components/tabs.vue";
  import { Options, Vue } from "vue-class-component";
  import { Prop } from "vue-property-decorator";
  import NewBill from "./new-bill.vue";
  import overview from "./overview/index.vue";
  import paidBills from "./paid-bills/index.vue";
  import pendingBills from "./pending-bills/index.vue";
  import unbilledEncounters from "./unbilled/index.vue";

  @Options({
    name: "CalendarIndex",
    components: {
      Tabs,
      overview,
      pendingBills,
      unbilledEncounters,
      paidBills,
      NewBill,
    },
  })
  export default class CalendarIndex extends Vue {
    @Prop({ type: String, default: "" })
    practitionerId!: string;

    showNewBill = false;
    tabLinks = [
      "Overview",
      "Pending Bills",
      "Unbilled Encounters",
      "Paid Bills",
    ];
    currentTab = 0;

    showBillModal() {
      this.showNewBill = !this.showNewBill;
    }
  }
</script>

<style></style>
