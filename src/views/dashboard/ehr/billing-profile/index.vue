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
        <!-- <day-availabiblty-section v-if="practitionerId"/> -->
        <tabs :items="tabLinks" v-model="currentTab">
          <overview />
          <pending-bills />
          <unbilled-encounters />
          <paid-bills />
        </tabs>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
  import Tabs from "@/components/tabs.vue";
  import { Options, Vue } from "vue-class-component";
  import { Prop } from "vue-property-decorator";
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
    },
  })
  export default class CalendarIndex extends Vue {
    @Prop({ type: String, default: "" })
    practitionerId!: string;

    tabLinks = [
      "Overview",
      "Pending Bills",
      "Unbilled Encounters",
      "Paid Bills",
    ];
    currentTab = 0;
  }
</script>

<style></style>
