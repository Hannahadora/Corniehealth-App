<template>
  <div v-if="paidBills._bills.data.length == 0">
    <empty-state />
  </div>
  <div v-else>
    <div class="flex w-full py-10 space-x-12">
      <div class="flex-1 rounded-2xl px-10 py-5 shadow-lg">
        <div class="flex">
          <div class="flex-1">
            <div class="flex flex-col">
              <div class="text-gray-400">Bill Count</div>
              <div class="font-bold text-xl">
                {{ paidBills._billCounts }}
              </div>
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
              <div class="text-gray-400">Total Bills Value</div>
              <div class="font-bold text-xl">
                ₦ {{ paidBills._totalBillValues }}
              </div>
            </div>
          </div>
          <div class="flex-none">
            <img src="@/assets/img/debit-card-blue.svg" />
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="flex justify-end w-full pb-5">
      <button class="py-4 px-7 w-60 bg-danger text-white rounded-2xl font-bold">
        New Bill
      </button>
    </div> -->
    <cornie-table :columns="headers" v-model="items">
      <template #status="{ item: { status } }">
        <span
          :class="{
            'bg-success text-success': status && status.toLowerCase() == 'paid',
            // ' bg-danger text-danger': status == 'inactive',
            ' bg-warning text-warning':
              status && status.toLowerCase() == 'pending',
            // ' bg-blue-yonder text-blue-yonder': status == 'relapse',
            // ' bg-blue-800 text-blue-800': status == 'remission',
            // ' bg-gray-800 text-gray-800': status == 'resolved',
          }"
          class="px-1 text-center rounded-md p-1 bg-opacity-20"
        >
          {{ status }}
        </span>
      </template>
    </cornie-table>
  </div>
</template>
<script lang="ts">
  import CornieTable from "@/components/cornie-table/CornieTable.vue";
  import { cornieClient } from "@/plugins/http";
  import { Options, Vue } from "vue-class-component";
  import EmptyState from "../empty-state.vue";

  @Options({
    name: "Pending Bills",
    components: {
      CornieTable,
      EmptyState,
      // transactionFilterDialog,
    },
  })
  export default class PaidBills extends Vue {
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
        title: "Practitioner",
        key: "practitioner",
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
        title: "Payment Date",
        key: "paymentDate",
        show: false,
        noOrder: true,
      },
      {
        title: "status",
        key: "status",
        show: true,
        noOrder: true,
      },
    ];

    paidBills = {
      _bills: {
        data: [],
      },
    } as any; //paidBills[];

    printRecorded(date: Date) {
      return new Date(date).toLocaleDateString();
    }

    get items() {
      // return new Array(6).fill({
      //   date: new Date().toLocaleDateString(),
      //   id: "CRH353434",
      //   biller: "Dr John Adeniyi",
      //   // patient: "XXXXXX",
      //   account: "3209320932",
      //   payor: "James Daniel",
      //   total: "₦ 40,000",
      //   bank: "GTB",
      //   paymentDate: "18/07/2022",
      //   status: "Pending",
      // });
      return this.paidBills._bills.data.length == 0
        ? this.paidBills._bills.data
        : this.paidBills?._bills.data.map((x: any) => {
            return {
              date: this.printRecorded(x.createdAt),
              id: x.idn,
              biller: x.createdBy.firstName + " " + x.createdBy.lastName,
              patient: x.subject,
              account: "XXXXXX",
              payor: x.subject,
              total: `₦ ${x.total}`,
              practitioner: "XXXXXX",
              paymentDate: this.printRecorded(x.paidAt),
              status: x.status,
            };
          });
    }

    get patientId() {
      return this.$route.params.id;
    }

    async fetchPaidBills() {
      const pending = cornieClient().get(
        `/api/v1/patient-portal/billing/paid-bills`
      );
      const response = await Promise.all([pending]);
      console.log("paid bills", response[0].data);
      this.paidBills = response[0].data;
    }

    async mounted() {
      await this.fetchPaidBills();
    }
  }
</script>
