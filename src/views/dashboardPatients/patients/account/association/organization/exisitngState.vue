<template>
  <div class="w-full pb-7">
    <span class="flex justify-end w-full mb-3">
      <button
        @click="showMemeberList = !showMemeberList"
        class="bg-danger items-center flex space-x-4 justify-between rounded-md text-white font-semibold text-sm mt-5 py-3 px-8 focus:outline-none hover:opacity-90"
      >
        <span> Search Organisation </span>
        <span> | </span>
        <chevron-down-icon class="stroke-current text-white" />
      </button>
      <div
        :class="[!showMemeberList ? 'hidden' : 'o']"
        class="absolute shadow h-auto overflow-x-hidden bg-white py-4 border-gray-400 border top-100 z-10 right-8 m-3 rounded overflow-y-auto mt-2"
        style="width: 14%; top: 500px"
      >
        <div class="mb-2 w-full">
          <span
            class="text-black cursor-pointer w-full px-4 flex text-left text-sm hover:bg-blue-100 rounded-full py-3"
            @click="showOrgModal = true"
            >Search Organisation</span
          >
        </div>
        <div class="mb-2 w-full">
          <span
            class="text-black cursor-pointer w-full px-4 flex text-left text-sm hover:bg-blue-100 rounded-full py-3"
            >Create New</span
          >
        </div>
      </div>
    </span>
    <cornie-table
      :columns="rawHeaders"
      v-model="items"
      :check="false"
      :fixeHeight="true"
    >
      <template #actions="{ item }">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="accept(item.associationId)"
        >
          <eye-icon class="text-yellow-400 fill-current" />
          <span class="ml-3 text-xs">Accept</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="showDependents(item.associationId)"
        >
          <family-icon class="text-primary fill-current" />
          <span class="ml-3 text-xs">Dependants</span>
        </div>
        <div
          @click="reject(item.associationId)"
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
        >
          <delete-icon class="text-danger fill-current" />
          <span class="ml-3 text-xs">Deactivate</span>
        </div>
      </template>
      <template #status="{ item }">
        <span
          :class="getStatusColor(item.status)"
          class="bg-red-200 text-red-400 text-center rounded-md py-2 px-4 bg-opacity-20"
        >
          {{ item.status }}
        </span>
      </template>
    </cornie-table>
  </div>
  <view-modal v-model="showViewProvider" />
  <dependant-modal
    :associationId="currentAssociation"
    v-model="showDependant"
  />
  <member-modal v-model="showMember" />
  <org-modal v-model="showOrgModal" />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import TableOptions from "@/components/table-options.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import DeleteIcon from "@/components/icons/deactivate.vue";
import LocationIcon from "@/components/icons/location.vue";
import EyeIcon from "@/components/icons/newview.vue";
import EditIcon from "@/components/icons/edit.vue";
import { Prop, Watch } from "vue-property-decorator";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";

import FamilyIcon from "../icons/family.vue";
import DependantModal from "./dependants.vue";
import MemberModal from "./memberModal.vue";
import OrgModal from "../exisitingOrg.vue";
import { IOrganizationMember } from "./types";
import { cornieClient } from "@/plugins/http";

@Options({
  emits: ["refresh"],
  name: "OrganizationLinkedAccount",
  components: {
    CornieTable,
    EditIcon,
    LocationIcon,
    DeleteIcon,
    EyeIcon,
    TableOptions,
    ChevronDownIcon,
    FamilyIcon,
    DependantModal,
    MemberModal,
    OrgModal,
  },
})
export default class OrganizationLinkedAccount extends Vue {
  showColumnFilter = false;
  showMemeberList = false;
  query = "";
  showDependant = false;
  currentAssociation = "";
  showOrgModal = false;

  @Prop({ type: Array, default: [] })
  associations!: IOrganizationMember[];

  refreshing = false;
  showViewProvider = false;

  rawHeaders = [
    { title: "DATE ADDED", key: "date", show: true, noOrder: true },
    {
      title: "ORGANISATION ID",
      key: "organizationId",
      show: true,
      noOrder: true,
    },
    {
      title: "name",
      key: "name",
      show: true,
      noOrder: true,
    },
    {
      title: "RELATIONSHIP",
      key: "relationship",
      show: true,
      noOrder: true,
    },
    {
      title: "PAYMENT ACCOUNT",
      key: "paymentAccount",
      show: true,
      noOrder: true,
    },
    {
      title: "STATUS",
      key: "status",
      show: true,
    },
  ];

  showDependents(associationId: string) {
    this.showDependant = true;
    this.currentAssociation = associationId;
  }

  async accept(associationId: string) {
    try {
      await cornieClient().patch(
        `/api/v1/patient-portal/employer/accept/${associationId}`,
        {}
      );
      window.notify({ msg: "Association accepted", status: "success" });
      this.$emit("refresh");
    } catch (error) {
      window.notify({ msg: "Association not accepted", status: "error" });
    }
  }

  async reject(associationId: string) {
    try {
      await cornieClient().delete(
        `/api/v1/patient-portal/employer/reject/${associationId}`,
        {}
      );
      window.notify({ msg: "Association rejected", status: "success" });
      this.$emit("refresh");
    } catch (error) {
      window.notify({ msg: "Association not rejected", status: "error" });
    }
  }

  get items() {
    return this.associations.map((association) => ({
      date: new Date(association.dateAdded).toLocaleDateString(),
      organizationId: association.organizationId,
      name: association.organizationName,
      relationship: association.relationship,
      role: association.role,
      paymentAccount: "-----",
      status: association.status,
      associationId: association.associationId,
    }));
  }

  getStatusColor(status: "Pending" | "Active" | "Inactive") {
    switch (status) {
      case "Active":
        return ["bg-green-200 text-green-700"];
      case "Pending":
        return ["bg-yellow-200 text-yellow-500"];
      case "Inactive":
        return ["bg-red-200 text-red-400"];
      default:
        break;
    }
  }
}
</script>
