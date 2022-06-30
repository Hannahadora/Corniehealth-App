<template>
  <div class="rounded-2xl bg-white p-10">
    <div class="border-b pb-4 font-bold text-2xl">All Transactions</div>
    <div class="flex w-full py-10 space-x-12">
      <div class="flex-1 rounded-2xl px-10 py-5 shadow-lg">
        <div class="flex">
          <div class="flex-1">
            <div class="flex flex-col">
              <div class="text-gray-400">Transaction Volume</div>
              <div class="font-bold text-xl">1132</div>
            </div>
          </div>
          <div class="flex-none">
            <img src="@/assets/img/debit-card-green.svg" />
          </div>
        </div>
      </div>
      <div class="flex-1 rounded-2xl px-10 py-5 shadow-lg">
        <div class="flex">
          <div class="flex-1">
            <div class="flex flex-col">
              <div class="text-gray-400">Total Receivables Value</div>
              <div class="font-bold text-xl">N32,094,045</div>
            </div>
          </div>
          <div class="flex-none">
            <img src="@/assets/img/debit-card-blue.svg" />
          </div>
        </div>
      </div>
    </div>
    <cornie-table @filter="showFDialog" :columns="headers" v-model="items">
    </cornie-table>
    <transaction-filter-dialog v-model="showDialog" />
  </div>
</template>
<script lang="ts">
  import CornieTable from "@/components/cornie-table/CornieTable.vue";
  import { cornieClient } from "@/plugins/http";
  import { Options, Vue } from "vue-class-component";
  import transactionFilterDialog from "./components/transaction-filter-dialog.vue";
  @Options({
    name: "Billing Transactions",
    components: {
      CornieTable,
      transactionFilterDialog,
    },
  })
  export default class BillingTransactions extends Vue {
    showDialog = false;
    headers = [
      {
        title: "Bill date",
        key: "date",
        show: true,
        noOrder: true,
      },
      {
        title: "Bill id",
        key: "id",
        show: true,
        noOrder: true,
      },
      {
        title: "Biller",
        key: "biller",
        show: true,
        noOrder: true,
      },
      {
        title: "Patient/subject",
        key: "patient",
        show: true,
        noOrder: true,
      },
      {
        title: "Account",
        key: "account",
        show: true,
        noOrder: true,
      },
      {
        title: "Payor",
        key: "payor",
        show: true,
        noOrder: true,
      },
      {
        title: "Total amount",
        key: "total",
        show: true,
        noOrder: true,
      },
      {
        title: "status",
        key: "status",
        show: true,
        noOrder: true,
      },
    ];
    bills = [];

    get items() {
      // return new Array(6).fill({
      //   date: new Date().toLocaleDateString(),
      //   id: "XXXXXX",
      //   biller: "XXXXXX",
      //   patient: "XXXXXX",
      //   account: "MTN\n 3209320932",
      //   payor: "MTN",
      //   total: "N40,000",
      //   status: "Ongoing",
      // });
      return this.bills.length == 0
        ? this.bills
        : this.bills.map((x: any) => {
            return {
              date: this.printRecorded(x.createdAt),
              id: x.idn,
            };
          });
    }

    showFDialog() {
      this.showDialog = true;
    }

    printRecorded(date: string) {
      return new Date(date).toLocaleDateString();
    }

    async getBills() {
      const { data } = await cornieClient().get("/api/v1/bill");
      console.log("bills", data);
      this.bills = data;
    }

    async mounted() {
      await this.getBills();
    }
  }
</script>
