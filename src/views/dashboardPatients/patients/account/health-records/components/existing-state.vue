<template>
  <div class="w-full">
    <div>
      <div class="text-3xl font-bold text-primary border-b-2 py-4 px-4">
        Health Records
      </div>
      <div class="flex justify-end w-full mb-8 space-x-5">
        <button
          @click="newPaymentAccount"
          class="border-primary border rounded-xl font-bold text-primary mt-5 py-4 px-8 mb-5 focus:outline-none hover:opacity-90"
        >
          Manage Privileges
        </button>
        <button
          @click="newPaymentAccount"
          class="bg-danger rounded-xl text-white mt-5 py-4 px-8 mb-5 font-semibold focus:outline-none hover:opacity-90"
        >
          Add New Account
        </button>
      </div>
      <cornie-table :columns="headers" v-model="items">
        <template #code="{ item }">
          <div class="flex flex-col text-sm">
            <span class="">
              {{ item.code.display }}
            </span>
            <span class="text-xs text-gray-400">
              {{ item.code.code }}
            </span>
          </div>
        </template>
        <template #recorder="{ item }">
          <div class="flex flex-col text-sm">
            <span class="">
              {{ item.recorder.name }}
            </span>
            <span class="text-xs text-gray-400">
              {{ item.recorder.department }}
            </span>
          </div>
        </template>
        <template #billing="{ item: { billing } }">
          <span
            :class="{
              // 'bg-success text-success': status == 'active',
              // ' bg-danger text-danger': status == 'inactive',
              ' bg-warning text-warning': billing == 'pending',
              // ' bg-blue-yonder text-blue-yonder': status == 'relapse',
              // ' bg-blue-800 text-blue-800': status == 'remission',
              // ' bg-gray-800 text-gray-800': status == 'resolved',
            }"
            class="px-1 text-center rounded-md p-1 bg-opacity-20"
          >
            {{ billing }}
          </span>
        </template>
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
        <template #actions="{ item }">
          <!-- <div
            @click="viewPayment(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <new-view-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">View</span>
          </div> -->

          <!-- <div
            v-if="item.paymentType !== 'Card'"
            @click="editAccount(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <edit-icon class="text-primary fill-current" />
            <span class="ml-3 text-xs"> Edit </span>
          </div> -->
          <!-- <div
            @click="deleteAccount(item.id)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <delete-icon class="text-danger fill-current cursor-pointer" />
            <span class="ml-3 text-xs">Delete</span>
          </div> -->
        </template>
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
  import { Prop } from "vue-property-decorator";
  import { namespace } from "vuex-class";

  const encounter = namespace("encounter");

  @Options({
    name: "EncounterExistingState",
    components: {
      CornieTable,
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
    @Prop()
    healthRecords!: any[];

    headers = [
      {
        title: "Record ID",
        key: "id",
        show: true,
        noOrder: true,
      },
      {
        title: "Record Mode",
        key: "mode",
        show: true,
      },
      {
        title: "Practice",
        key: "practiceName",
        show: true,
      },
      {
        title: "Type",
        key: "practiceType",
        show: true,
      },
      {
        title: "Date Created",
        key: "createdAt",
        show: true,
      },
      {
        title: "Last Updated",
        key: "updatedAt",
        show: true,
      },
      {
        title: "Registered By",
        key: "addedBy",
        show: true,
      },
      {
        title: "status",
        key: "status",
        show: true,
      },
    ];

    //insure-emp, insure-pri, flerxi, wallet, cash, dc, cc, corp-bill-acct

    get items() {
      console.log("vcvcvc", this.healthRecords);
      const items =
        this.healthRecords.length > 0
          ? this.healthRecords.map((p: any) => {
              return {
                id: p.id,
                mode: p.mode,
                practiceName: p.practiceName,
                practiceType: p.practiceType,
                createdAt: this.printDate(p.createdAt),
                updatedAt: this.printDate(p.updatedAt),
                addedBy: p.addedBy,
                status: p.status,
                ...p,
              };
            })
          : [];

      return items;
    }

    printDate(date: string) {
      return new Date(date).toLocaleDateString();
    }
    async deleteAccount(id: string) {
      try {
        const response = await cornieClient().delete(
          `/api/v1/patient-portal/payment/${id}`
        );
        window.notify({
          msg: "Payment account added successfully",
          status: "success",
        });
        this.$emit("reloadPayment");
      } catch (error) {
        window.notify({
          msg: "Error updating payment account",
          status: "error",
        });
      }
    }
    printRecorded(dateR: any) {
      const dateString = dateR;
      const date = new Date(dateString);
      return date.toLocaleDateString();
    }
    newPaymentAccount() {
      this.$emit("newpaymentaccount");
    }
  }
</script>
