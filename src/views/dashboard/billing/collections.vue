<template>
  <div class="rounded-2xl bg-white p-10">
    <div class="border-b pb-4 font-bold text-2xl">Collections</div>
    <div class="w-full h-full">
      <tabs :items="tablinks" v-model="currentTab">
        <privateTab :bills="collections" />
        <self-funded :bills="collections" />
        <insurance-claim :bills="collections" />
      </tabs>
    </div>
  </div>
</template>
<script lang="ts">
  import Tabs from "@/components/tabs.vue";
  import { cornieClient } from "@/plugins/http";
  import { Options, Vue } from "vue-class-component";
  import insuranceClaim from "./collectionTabs/insuranceClaims.vue";
  import privateTab from "./collectionTabs/private.vue";
  import selfFunded from "./collectionTabs/self-funded.vue";

  @Options({
    components: {
      Tabs,
      privateTab,
      selfFunded,
      insuranceClaim,
    },
  })
  export default class AccountReceiving extends Vue {
    tablinks = [
      "Private(No insurance)",
      "Self-Funded Accounts",
      "Insurance claims",
    ];
    currentTab = 0;
    collections = [];
    async fetchP() {
      const response = await cornieClient().get("/api/v1/bill/collection");
      console.log("billings collection", response.data);
      this.collections = response.data;
    }
    mounted() {
      this.fetchP();
    }
  }
</script>
