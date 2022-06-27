<template>
  <div class="rounded-2xl bg-white p-10">
    <div class="border-b pb-4 font-bold text-2xl">Collections</div>
    <div class="w-full h-full">
      <tabs :items="tablinks" v-model="currentTab">
        <privateTab />
        <self-funded />
        <insurance-claim />
      </tabs>
    </div>
  </div>
</template>
<script lang="ts">
  import Tabs from "@/components/tabs.vue";
  import { Options, Vue } from "vue-class-component";
  import insuranceClaim from "./receivablesTabs/insuranceClaims.vue";
  import privateTab from "./receivablesTabs/private.vue";
  import selfFunded from "./receivablesTabs/self-funded.vue";

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
  }
</script>
