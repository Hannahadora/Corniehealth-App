<template>
  <div class="w-full">
    <div>
      <div class="text-xl font-bold text-primary border-b-2 py-4 px-4">
        Health Records
      </div>
      <div class="flex justify-end w-full mb-8 space-x-5">
        <button
          @click="addInvite"
          class="border-primary border rounded-xl font-bold text-primary mt-5 py-2 px-5 mb-5 focus:outline-none hover:opacity-90"
        >
          Manage Privileges
        </button>
        <button
          @click="addInvite"
          class="bg-danger rounded-xl text-white mt-5 py-2 px-5 mb-5 font-semibold focus:outline-none hover:opacity-90"
        >
          Add/Invite a Provider
        </button>
      </div>
      <cornie-table
        class="hidden md:block"
        :columns="headers"
        v-model="items"
        :fixeHeight="true"
      >
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
        <template #mode="{ item: { mode } }">
          <div class="uppercase">{{ mode }}</div>
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
          <div
            @click="viewChart(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <new-view-icon class="text-red-500 fill-current" />
            <span class="ml-3 text-xs">View Chart</span>
          </div>
          <div
            @click="viewProfile(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <new-view-icon class="text-primary-500 fill-current" />
            <span class="ml-3 text-xs">View Profile</span>
          </div>
          <div
            @click="acceptP(item.id)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <check-icon class="text-blue-500 fill-current" />
            <span class="ml-3 text-xs">Accept</span>
          </div>

          <div
            @click="declineP(item.id)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <decline class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">Decline</span>
          </div>

          <div
            @click="viewProfile(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <!-- <decline class="text-yellow-500 fill-current" /> -->
            <group-icon class="text-yellow-500 fill-current" />

            <span class="ml-3 text-xs">Care Team</span>
          </div>

          <div
            @click="viewProfile(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <!-- <decline class="text-yellow-500 fill-current" /> -->
            <group-icon class="text-yellow-500 fill-current" />

            <span class="ml-3 text-xs">Manage Permission</span>
          </div>

          <div
            @click="viewProfile(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <!-- <decline class="text-yellow-500 fill-current" /> -->
            <group-icon class="text-yellow-500 fill-current" />

            <span class="ml-3 text-xs">Book Appointment</span>
          </div>
          <div
            @click="revokeP(item.id)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <!-- <decline class="text-yellow-500 fill-current" /> -->
            <group-icon class="text-yellow-500 fill-current" />

            <span class="ml-3 text-xs">Revoke Access</span>
          </div>
          <div
            @click="viewProfile(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <!-- <decline class="text-yellow-500 fill-current" /> -->
            <group-icon class="text-yellow-500 fill-current" />

            <span class="ml-3 text-xs">Merge</span>
          </div>
        </template>
      </cornie-table>
      <div class="block md:hidden">
        <div class="mb-5">
          <search-section :placeholder="'Search Table'" />
        </div>
        <div
          v-for="(record, i) in items"
          :key="i"
          class="bg-white shadow-lg py-2 px-8 w-full rounded-lg rounded-b-none h-full"
        >
          <div
            class="justify-between flex mb-5 border-b-2 py-2 border-gray-200"
          >
            <p class="text-primary">#</p>
            <p>{{ i + 1 }}</p>
          </div>
          <div
            class="justify-between flex mb-5 py-2 border-b-2 border-gray-200"
          >
            <p class="text-primary uppercase font-bold text-sm">record id</p>
            <p class="flex truncate">{{ record.id }}</p>
          </div>
          <div
            class="justify-between flex mb-5 py-2 border-b-2 border-gray-200"
          >
            <p class="text-primary uppercase font-bold text-sm">record mode</p>
            <p>{{ record.mode }}</p>
          </div>
          <div
            class="justify-between flex mb-5 py-2 border-b-2 border-gray-200"
          >
            <p class="text-primary uppercase font-bold text-sm">Practice</p>
            <p>{{ record.practiceName }}</p>
          </div>
          <div
            class="justify-between flex mb-5 py-2 border-b-2 border-gray-200"
          >
            <p class="text-primary uppercase font-bold text-sm">type</p>
            <p>{{ record.practiceType }}</p>
          </div>
          <div
            class="justify-between flex mb-5 py-2 border-b-2 border-gray-200"
          >
            <p class="text-primary uppercase font-bold text-sm">Date Created</p>
            <p>{{ record.createdAt }}</p>
          </div>

          <div
            class="justify-between flex mb-5 py-2 border-b-2 border-gray-200"
          >
            <p class="text-primary uppercase font-bold text-sm">Last updated</p>
            <p>{{ record.updatedAt }}</p>
          </div>
          <div
            class="justify-between flex mb-5 py-2 border-b-2 border-gray-200"
          >
            <p class="text-primary uppercase font-bold text-sm">
              Registered By
            </p>
            <p>{{ record.addedBy }}</p>
          </div>
          <div class="justify-between flex mb-5 border-b-2 border-gray-200">
            <p class="text-primary">status</p>
            <p class="bg-yellow-100 text-yellow-500 rounded py-1 text-sm px-2">
              {{ record.status }}
            </p>
          </div>
          <div class="flex w-full justify-center py-2">
            <DotsHorizontalIcon />
          </div>
        </div>
      </div>
    </div>
    <provider-profile
      :profile="providerProfile"
      v-model="showProviderProfile"
    />
  </div>
</template>
<script lang="ts">
  import CornieTable from "@/components/cornie-table/CornieTable.vue";
  import DeleteIcon from "@/components/icons/cancel.vue";
  import CheckIcon from "@/components/icons/check-green-bg.vue";
  import Decline from "@/components/icons/decline.vue";
  import EditIcon from "@/components/icons/edit.vue";
  import GroupIcon from "@/components/icons/groupform.vue";
  import HistoryIcon from "@/components/icons/history.vue";
  import UpdateIcon from "@/components/icons/newupdate.vue";
  import NewViewIcon from "@/components/icons/newview.vue";
  import PlusIcon from "@/components/icons/plus.vue";
  import SearchSection from "@/components/search-input.vue";
  import { cornieClient } from "@/plugins/http";
  import { Options, Vue } from "vue-class-component";
  import { Prop } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import ProviderProfile from "./provider-profile.vue";

  const encounter = namespace("encounter");

  @Options({
    name: "EncounterExistingState",
    components: {
      CornieTable,
      SearchSection,
      EditIcon,
      NewViewIcon,
      UpdateIcon,
      PlusIcon,
      HistoryIcon,
      DeleteIcon,
      Decline,
      CheckIcon,
      GroupIcon,
      ProviderProfile,
    },
    emits: ["addInvite", "reloadPayment"],
  })
  export default class EncounterExistingState extends Vue {
    @Prop()
    healthRecords!: any[];

    showProviderProfile = false;
    providerProfile!: any;
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
      // {
      //   title: "Registered By",
      //   key: "addedBy",
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
      console.log("vcvcvc", this.healthRecords);
      const items =
        this.healthRecords.length > 0
          ? this.healthRecords.map((p: any) => {
              return {
                id: p.id,
                mode: p.mode ? p.mode.toUpperCase() : "",
                practiceName: p.organization.name,
                practiceType: p.organization.practiceType,
                createdAt: new Date(p.createdAt),
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
      return new Date(date).toLocaleString();
    }

    viewProfile(item: any) {
      this.providerProfile = item;
      this.showProviderProfile = true;
    }
    async acceptP(id: string) {
      const confirmed = await window.confirmAction({
        message: "Confirm you want to accept this registration",
        title: "Accept",
      });
      if (!confirmed) return;
      try {
        const response = await cornieClient().patch(
          `/api/v1/patient-portal/provider-permission/accept/${id}`,
          {}
        );
        window.notify({
          msg: "Permission granted",
          status: "success",
        });
      } catch (error) {
        window.notify({
          msg: "Error Accepting Permission",
          status: "error",
        });
      }
    }
    async declineP(id: string) {
      const confirmed = await window.confirmAction({
        message: "Confirm you want to decline this registration",
        title: "Decline",
      });
      if (!confirmed) return;
      try {
        const response = await cornieClient().patch(
          `/api/v1/patient-portal/provider-permission/decline/${id}`,
          {}
        );
        window.notify({
          msg: "Permission Declined",
          status: "success",
        });
      } catch (error) {
        window.notify({
          msg: "Error Declining Permission",
          status: "error",
        });
      }
    }

    async revokeP(id: string) {
      const confirmed = await window.confirmAction({
        message: "Confirm you want to Revoke this registration",
        title: "Revoke Access",
      });
      if (!confirmed) return;
      try {
        const response = await cornieClient().patch(
          `/api/v1/patient-portal/provider-permission/revoke/${id}`,
          {}
        );
        window.notify({
          msg: "Permission Revoked",
          status: "success",
        });
      } catch (error) {
        window.notify({
          msg: "Error Revoking Permission",
          status: "error",
        });
      }
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
    addInvite() {
      this.$emit("addInvite");
    }
  }
</script>
