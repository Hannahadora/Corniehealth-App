<template>
  <div class="w-full">
    <empty-state v-if="doctorOrder.length == 0" />
    <div v-else>
      <div class="flex justify-end w-full mb-8">
        <button
          @click="newLabOrder"
          class="bg-danger rounded-lg text-white mt-5 py-4 px-8 mb-5 font-semibold focus:outline-none hover:opacity-90"
        >
          Order New
        </button>
      </div>
      <cornie-table :columns="headers" v-model="items">
        <template #status="{ item: { status } }">
          <span
            :class="{
              'bg-success text-success': status == 'active',
              ' bg-danger text-danger': status == 'inactive',
              ' bg-warning text-warning': status == 'recurrence',
              ' bg-blue-yonder text-blue-yonder': status == 'relapse',
              ' bg-blue-800 text-blue-800': status == 'preparation',
              ' bg-gray-800 text-gray-800': status == 'resolved',
            }"
            class="px-1 text-center rounded-md p-1 bg-opacity-20"
          >
            {{ status }}
          </span>
        </template>
        <template #actions="{ item }"> </template>
      </cornie-table>
    </div>
  </div>
</template>
<script lang="ts">
  import CornieTable from "@/components/cornie-table/CornieTable.vue";
  import DeleteIcon from "@/components/icons/cancel.vue";
  import EditIcon from "@/components/icons/edit.vue";
  import HistoryIcon from "@/components/icons/history.vue";
  import UpdateIcon from "@/components/icons/newupdate.vue";
  import NewViewIcon from "@/components/icons/newview.vue";
  import PlusIcon from "@/components/icons/plus.vue";
  import { cornieClient } from "@/plugins/http";
  import { Options, Vue } from "vue-class-component";
  import { namespace } from "vuex-class";
  import EmptyState from "../empty-state.vue";

  const encounter = namespace("encounter");

  @Options({
    name: "EncounterExistingState",
    components: {
      CornieTable,
      EmptyState,
      // AddNotes,
      // ViewCondition,
      // RecordAbatement,
      // AddCondition,
      // StatusUpdate,
      // AddOccurence,
      EditIcon,
      NewViewIcon,
      UpdateIcon,
      PlusIcon,
      HistoryIcon,
      DeleteIcon,
    },
    emits: ["newpaymentaccount", "reloadPayment"],
  })
  export default class EncounterExistingState extends Vue {
    doctorOrder = [];

    headers = [
      {
        title: "Request Date",
        key: "date",
        show: true,
        noOrder: true,
      },
      {
        title: "Requistition id",
        key: "identifier",
        show: true,
      },
      {
        title: "Category",
        key: "category",
        show: true,
      },
      // {
      //   title: "Service Name",
      //   key: "service",
      //   show: true,
      // },
      {
        title: "Requester",
        key: "requester",
        show: true,
      },
      // {
      //   title: "Dispenser",
      //   key: "expiryDate",
      //   show: true,
      // },
      {
        title: "status",
        key: "status",
        show: true,
      },
    ];

    //insure-emp, insure-pri, flerxi, wallet, cash, dc, cc, corp-bill-acct

    get items() {
      const items =
        this.doctorOrder.length > 0
          ? this.doctorOrder.map((p: any) => {
              return {
                date: this.printRecorded(p.createdAt),
                identifier: p.identifier,
                category: p.category,
                requester: p?.organization?.name || "XXXXX",
                status: p?.status,
              };
            })
          : [];

      return items;
    }

    newPaymentAccount() {
      this.$emit("newpaymentaccount");
    }

    async fetchDoctorOrder() {
      const pending = cornieClient().get(
        `/api/v1/patient-portal/diagnostics/doctor-order`
      );
      const response = await Promise.all([pending]);
      console.log("doctor order", response[0].data);
      this.doctorOrder = response[0].data;
    }

    printRecorded(date: Date) {
      return new Date(date).toLocaleDateString();
    }
    async mounted() {
      await this.fetchDoctorOrder();
    }
    newLabOrder() {
      this.$emit("newLabOrder");
      // this.$router.push("/patient/appointments/");
    }
  }
</script>
