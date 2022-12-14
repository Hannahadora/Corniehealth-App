<template>
  <div class="container-fluid mb-9">
    <cornie-table :columns="rawHeaders" v-model="items">
      <template #actions="{ item }">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="viewPermissions(item.id)"
        >
          <eye-yellow class="text-danger fill-current" />
          <span class="ml-3 text-xs">View</span>
        </div>
        <!-- <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="viewCareTeam(item.id)"
        >
          <careteam-blue class="text-danger fill-current" />
          <span class="ml-3 text-xs">Care Team</span>
        </div> -->
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="accept(item.id)"
        >
          <check-green-bg class="text-danger fill-current" />
          <span class="ml-3 text-xs">Accept</span>
        </div>
        <!-- <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="manage(item.id)"
        >
          <settings-blue class="text-danger fill-current" />
          <span class="ml-3 text-xs">Manage Permission</span>
        </div> -->
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="decline(item.id)"
        >
          <cancel-red-bg class="text-danger fill-current" />
          <span class="ml-3 text-xs">Decline</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="revoke(item.id)"
        >
          <decline class="text-danger fill-current" />
          <span class="ml-3 text-xs">Revoke Access</span>
        </div>
      </template>
      <template #contactPerson="{ item }">
        <div>
          <p>{{ item.contactPerson }}</p>
          <p>{{ item.contactPersonPhone }}</p>
        </div>
      </template>
      <template #status="{ item }">
        <div class="flex items-center">
          <p
            class="text-xs bg-yellow-100 text-yellow-400 p-1 rounded"
            v-if="item.status == 'inactive'"
          >
            {{ item.status }}
          </p>
          <p
            class="text-xs bg-green-100 text-green-500 p-1 rounded"
            v-if="item.status == 'invited' || item.status == 'active'"
          >
            {{ item.status }}
          </p>
          <p
            class="text-xs bg-gray-300 p-1 rounded"
            v-if="item.status == 'new-registration'"
          >
            {{ item.status }}
          </p>
          <p
            class="text-xs bg-red-100 text-red-600 p-1 rounded"
            v-if="item.status == 'revoked' || item.status == 'declined'"
          >
            {{ item.status }}
          </p>
        </div>
      </template>
    </cornie-table>

    <manage-permissions v-model="managePermissionModal" />
    <accept-modal :id="itemId" v-model="acceptModal" />
    <decline-modal :id="itemId" v-model="declineModal" />
    <revoke-modal :id="itemId" v-model="revokeModal" />
    <care-team-modal :id="itemId" v-model="careTeamModal" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import EyeYellow from "@/components/icons/eye-yellow.vue";
import Decline from "@/components/icons/decline.vue";
import Revoke from "@/components/icons/revoke.vue";
import CareteamBlue from "@/components/icons/careteam-blue.vue";
import SettingsBlue from "@/components/icons/settings-blue.vue";
import CancelRedBg from "@/components/icons/cancel-red-bg.vue"
import CheckGreenBg from "@/components/icons/check-green-bg.vue"
import ToggleCheck from "@/components/ToogleCheck.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieRadio from "@/components/cornieradio.vue";
import ManagePermissions from "./manage-permissions.vue";
import AcceptModal from "./accept.vue";
import DeclineModal from "./decline.vue";
import RevokeModal from "./revoke.vue";
import CareTeamModal from "./care-team.vue"
import { cornieClient } from "@/plugins/http";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import { first, getTableKeyValue } from "@/plugins/utils";
import search from "@/plugins/search";

@Options({
  components: {
    ToggleCheck,
    CornieInput,
    CornieRadio,
    CornieTable,
    ManagePermissions,
    AcceptModal,
    DeclineModal,
    RevokeModal,
    CareTeamModal,
    EyeYellow,
    Decline,
    Revoke,
    CareteamBlue,
    CancelRedBg,
    CheckGreenBg,
    SettingsBlue,
  },
})
export default class AccessTable extends Vue {
  options = "I understand the implications, deactivate my account";
  loading = false;
  query = "";
  providerPermissions = [];
  itemId = "";
  managePermissionModal = false;
  acceptModal = false;
  declineModal = false;
  revokeModal = false;
  careTeamModal = false;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    {
      title: "PRACTICE ID",
      key: "practiceId",
      show: true,
    },
    {
      title: "PRACTICE NAME",
      key: "practiceName",
      show: true,
    },
    {
      title: "TYPE",
      key: "practiceType",
      show: true,
    },
    {
      title: "SPECIALTY",
      key: "specialty",
      show: true,
    },
    {
      title: "CONTACT PERSON",
      key: "contactPerson",
      show: true,
    },
    {
      title: "ADDED BY",
      key: "addedBy",
      show: true,
    },
    {
      title: "STATUS",
      key: "status",
      show: true,
    },
    {
      title: "ADDRESS",
      key: "address",
      show: false,
    },
    {
      title: "PHONE",
      key: "phone",
      show: false,
    },
    {
      title: "EMAIL",
      key: "email",
      show: false,
    },
    {
      title: "DATE ADDED",
      key: "dateAdded",
      show: false,
    },
  ];

  get items() {
    const providerPermissions = this.providerPermissions.map((practice: any) => {
      (practice as any).createdAt = new Date(
        (practice as any).createdAt
      ).toLocaleDateString("en-US");
      return {
        ...practice,
        action: practice.id,
        keydisplay: practice.id,
        practiceId: practice.practiceIdentifier ?? "XXXX",
        practiceName: practice.practiceName,
        practiceType: practice.practiceType || 'N/A',
        speialty: practice.specialty,
        contactPerson: practice.contactPerson,
        addedBy: practice.addedBy,
        status: practice.status,
      };
    });
    if (!this.query) return providerPermissions;
    return search.searchObjectArray(providerPermissions, this.query);
  }

  async fetchPermission() {
    try {
      this.loading = true;
      const res = await cornieClient().get(
        "/api/v1/patient-portal/provider-permission/"
      );
      this.loading = false;
      if (!res.status) {
        notify({
          msg: "There was an error fetching provider permissions",
          status: "error",
        });
      } else {
        this.providerPermissions = res.data;
      }
    } catch (error) {
      this.loading = false;
    }
  }

  viewPermissions(id: string) {
    this.itemId = id;
    // this.managePermissionModal = true;
  }
  viewCareTeam(id: string) {
    this.itemId = id;
    this.careTeamModal = true;
  }
  accept(id: string) {
    this.itemId = id;
    this.acceptModal = true;
  }
  manage(id: string) {
    this.itemId = id;
    // this.managePermissionModal = true;
  }
  decline(id: string) {
    this.itemId = id;
    this.declineModal = true;
  }
  revoke(id: string) {
    this.itemId = id;
    this.revokeModal = true;
  }

  async created() {
    await this.fetchPermission();
  }
}
</script>

<style scoped>
.border-dashed-b-2 {
  border-bottom: 1px dashed #c5c4d4;
}
</style>
