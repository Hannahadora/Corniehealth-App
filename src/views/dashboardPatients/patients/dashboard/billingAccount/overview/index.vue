<template>
  <div v-if="accountInfo.patientName == ''">
    <empty-state />
  </div>
  <div v-else class="flex justify-between space-x-7 p-5 w-full">
    <div class="flex flex-col space-y-7 p-8 rounded-xl border w-full">
      <div>
        <span class="py-2 px-3 rounded-full font-bold bg-black text-white">
          Account Info
        </span>
      </div>
      <div class="flex flex-col space-y-6">
        <div class="flex items-center">
          <div class="text-gray-400 flex-1">Patient Name:</div>
          <div>{{ accountInfo.patientName }}</div>
        </div>
        <div class="flex items-center">
          <div class="text-gray-400 flex-1">MRN #:</div>
          <div>{{ accountInfo.mrn }}</div>
        </div>
        <div class="flex items-center">
          <div class="text-gray-400 flex-1">Primary Account:</div>
          <div class="flex flex-col">
            <div class="cursor-pointer underline text-right">AIICO | 23418</div>
            <div class="text-gray-400">Expires 22 Oct, 2022</div>
          </div>
        </div>
        <div class="flex items-center">
          <div class="text-gray-400 flex-1">Others</div>
          <div class="text-red-400 flex items-center space-x-3 cursor-pointer">
            <add-icon class="fill-current text-danger" />
            <div>Add</div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col space-y-7 p-8 rounded-xl border w-full">
      <div>
        <span class="py-2 px-3 rounded-full font-bold bg-black text-white">
          Billing History
        </span>
      </div>
      <div class="flex flex-col space-y-6">
        <div class="flex items-center">
          <div class="text-gray-400 flex-1">Total No. of Encounters:</div>
          <div>{{ billingHistory.totalEncounters }}</div>
        </div>
        <div class="flex items-center">
          <div class="text-gray-400 flex-1">Biiled Encounters</div>
          <div>{{ billingHistory.billedEncounters }}</div>
        </div>
        <div class="flex items-center">
          <div class="text-gray-400 flex-1">Unbiiled Encounters</div>
          <div class="cursor-pointer underline">
            {{ billingHistory.unbilledEncounters }}
          </div>
        </div>
        <div class="flex items-center">
          <div class="text-gray-400 flex-1">Total Bills</div>
          <div>N {{ billingHistory.totalBills }}</div>
        </div>
        <div class="flex items-center">
          <div class="text-gray-400 flex-1">Paid to Date</div>
          <div>N {{ billingHistory.paidToDate }}</div>
        </div>
        <div class="flex items-center">
          <div class="text-gray-400 flex-1">Balance Payable</div>
          <div>N {{ billingHistory.balancePayable }}</div>
        </div>
        <div class="flex items-center">
          <div class="text-gray-400 flex-1">Others</div>
          <div class="text-red-400 flex items-center space-x-3 cursor-pointer">
            <add-icon class="fill-current text-danger" />
            <div>Add</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import AddIcon from "@/components/icons/plus.vue";
  import { cornieClient } from "@/plugins/http";
  import { Options, Vue } from "vue-class-component";
  import EmptyState from "../empty-state.vue";

  @Options({
    name: "BillingProfileOverview",
    components: {
      AddIcon,
      EmptyState,
    },
  })
  export default class BillingAccountOverview extends Vue {
    get patientId() {
      return this.$route.params.id;
    }
    accountInfo = {
      patientName: "",
      mrn: "",
      paymentAccount: [],
    };

    billingHistory = {
      billedEncounters: 0,
      unbilledEncounters: 0,
      totalBills: 0,
      unpaidBillCount: 0,
      totalBillCount: 0,
      paidBillCount: 0,
      totalEncounters: 0,
      paidToDate: 0,
      balancePayable: 0,
    };

    async fetchOveview() {
      const overview = cornieClient().get(
        `/api/v1/patient-portal/billing/overview`
      );
      const response = await Promise.all([overview]);
      console.log("billing overview", response[0].data);
      const { accountInfo, billingHistory } = response[0].data;
      this.accountInfo = accountInfo;
      this.billingHistory = billingHistory;
    }
    async mounted() {
      console.log("patient id", this.patientId);
      await this.fetchOveview();
    }
  }
</script>
