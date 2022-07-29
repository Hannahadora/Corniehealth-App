<template>
  <div>
    <div class="flex w-full py-10 space-x-12">
      <div class="w-1/2 rounded-2xl px-10 py-5 shadow-lg">
        <div class="flex">
          <div class="flex-1">
            <div class="flex flex-col">
              <div class="text-gray-400">Encounters</div>
              <div class="font-bold text-xl">{{ unbilled.length }}</div>
            </div>
          </div>
          <div class="flex-none">
            <img src="@/assets/img/debit-card-green.svg" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-end w-full pb-5">
      <button class="py-4 px-7 w-60 bg-danger text-white rounded-2xl font-bold">
        New Bill
      </button>
    </div>
    <cornie-table @filter="showFDialog" :columns="headers" v-model="items">
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
  import unbilledEncounter from "@/types/IUnbilledEncounter";
  import { Options, Vue } from "vue-class-component";

  @Options({
    name: "Pending Bills",
    components: {
      CornieTable,
      // transactionFilterDialog,
    },
  })
  export default class PendingBills extends Vue {
    headers = [
      {
        title: "Encounter id",
        key: "id",
        show: true,
        noOrder: true,
      },
      {
        title: "Encounter date",
        key: "date",
        show: true,
        noOrder: true,
      },
      {
        title: "Specialty / department",
        key: "department",
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
        title: "status",
        key: "status",
        show: true,
        noOrder: true,
      },
    ];

    get items() {
      // return new Array(6).fill({
      //   date: new Date().toLocaleDateString(),
      //   id: "CRH353434",
      //   biller: "Dr John Adeniyi",
      //   department: "XXXXXX",
      //   practitioner: "Dr John Adeniyi",
      //   account: "3209320932",
      //   payor: "James Daniel",
      //   status: "Pending",
      // });
      return this.unbilled.length == 0
        ? this.unbilled
        : this.unbilled.map((x) => ({
            date: new Date(x.createdAt).toLocaleDateString(),
            id: x.identifier,
            biller: x.practitionerId,
            department: "XXXXXX",
            practitioner:
              //@ts-ignore

              x.practitioner.firstName + " " + x.practitioner.lastName,
            account: "XXXXXX",
            payor: x.providerName,
            status: x.status,
          }));
    }

    unbilled = [] as unbilledEncounter[];
    get patientId() {
      return this.$route.params.id;
    }

    async fetchUnbilled() {
      const pending = cornieClient().get(
        `/api/v1/billing-profile/patient/${this.patientId}/unbilled-encounters`
      );
      const response = await Promise.all([pending]);
      console.log("Unbilled Encounter", response[0].data);
      this.unbilled = response[0].data;
    }

    async mounted() {
      await this.fetchUnbilled();
    }
  }
</script>
