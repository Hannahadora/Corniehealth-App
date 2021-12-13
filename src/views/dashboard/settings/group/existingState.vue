<template>
  <div class="w-full">
    <span class="flex justify-end w-full">
      <button
        class="bg-danger rounded-full text-white mt-5 py-2 pr-5 pl-5 px-3 focus:outline-none hover:opacity-90"
        @click="$router.push('/dashboard/provider/add-group')"
      >
        Add a Group
      </button>
    </span>
    <cornie-table :columns="rawHeaders" v-model="sortGroups">
      <template #actions="{ item }">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="$router.push(`/dashboard/provider/view-group/${item.id}`)"
        >
          <newview-icon class="text-yellow-500 fill-current" />
          <span class="ml-3 text-xs">View</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="$router.push(`/dashboard/provider/add-group/${item.id}`)"
        >
          <edit-icon class="mr-3" />
          <span class="ml-3 text-xs">Edit</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="displayMember(item.id)"
        >
          <span class="mr-3 text-2xl bold text-primary">+</span>
          <span class="ml-3 text-xs">Add Memeber </span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          v-if="item.groupStatusDetails.active == true"
          @click="showDeactivateGroup(item.id)"
        >
          <close-icon class="mr-3" />
          <span class="ml-3 text-xs">Deactivate</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          v-if="item.groupStatusDetails.active == false"
          @click="activateGroup(getKeyValue(item).value)"
        >
          <close-icon class="mr-3" />
          <span class="ml-3 text-xs">Activate</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="deleteItem(item.id)"
        >
          <cancel-icon />
          <span class="ml-3 text-xs">Delete</span>
        </div>
      </template>
    </cornie-table>

    <member-modal v-model:visible="showMemberModal" :paymentId="paymentId" />
    <deactivate-modal
      v-model:visible="showDeativateModal"
      :paymentId="paymentId"
    />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Table from "@scelloo/cloudenly-ui/src/components/table";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import TableOptions from "@/components/table-options.vue";
import search from "@/plugins/search";
import { first, getTableKeyValue } from "@/plugins/utils";
import { Prop } from "vue-property-decorator";
import IGroup from "@/types/IGroup";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import MemberModal from "./memberModal.vue";
import DeactivateModal from "./deactivateModal.vue";
import EyeIcon from "@/components/icons/eye.vue";
import EditIcon from "@/components/icons/edit.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import CancelIcon from "@/components/icons/cancel.vue";

const group = namespace("group");

@Options({
  components: {
    Table,
    SortIcon,
    ThreeDotIcon,
    CancelIcon,
    SearchIcon,
    CloseIcon,
    PrintIcon,
    TableRefreshIcon,
    CornieTable,
    FilterIcon,
    IconInput,
    ColumnFilter,
    TableOptions,
    DeleteIcon,
    EyeIcon,
    EditIcon,
    MemberModal,
    DeactivateModal,
  },
})
export default class GroupExistingState extends Vue {
  showColumnFilter = false;
  showModal = false;
  loading = false;
  query = "";
  showMemberModal = false;
  showDeativateModal = false;
  paymentId = "";

  @group.State
  groups!: IGroup[];

  @group.Action
  deleteGroup!: (id: string) => Promise<boolean>;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    { title: "IDENTIFIER", key: "id", show: true },
    { title: "Name", key: "name", show: true },
    {
      title: "Quantity",
      key: "quantity",
      show: true,
    },
    {
      title: "Type",
      key: "type",
      show: true,
    },
    {
      title: "Status",
      key: "status",
      show: false,
    },
    {
      title: "Managing Entity",
      key: "managingEntity",
      show: true,
    },
    {
      title: "Characteristics Code",
      key: "characteristicsCode",
      show: false,
    },
    {
      title: "Code",
      key: "code",
      show: false,
    },
    {
      title: "Value Range",
      key: "valueRange",
      show: false,
    },
    {
      title: "Period",
      key: "period",
      show: false,
    },
    {
      title: "Value Boolean",
      key: "valueBoolean",
      show: false,
    },
    {
      title: "Value Reference",
      key: "valueRef",
      show: false,
    },
    {
      title: "Exclude",
      key: "exclude",
      show: false,
    },
    {
      title: "Member Period",
      value: "memberPeriod",
      show: false,
    },
    {
      title: "Member Status",
      key: "memberStatus",
      show: false,
    },
    {
      title: "Member Entity",
      key: "memberEntity",
      show: false,
    },
    {
      title: "Value Quantity",
      key: "valueQuantity",
      show: false,
    },
    {
      title: "Value Codeable Concept",
      key: "valueCodeableConcept",
      show: false,
    },
  ];

  get headers() {
    const preferred =
      this.preferredHeaders.length > 0
        ? this.preferredHeaders
        : this.rawHeaders;
    const headers = preferred.filter((header) => header.show);
    return [...first(4, headers), { title: "", value: "action", image: true }];
  }

  get items() {
    const groups = this.groups.map((group) => {
      (group as any).period = new Date(
        (group as any).period
      ).toLocaleDateString("en-US");
      (group as any).memberPeriod = new Date(
        (group as any).memberPeriod
      ).toLocaleDateString("en-US");

      return {
        ...group,
        action: group.id,
      };
    });
    if (!this.query) return groups;
    return search.searchObjectArray(groups, this.query);
  }

  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this group",
      title: "Delete Group",
    });
    if (!confirmed) return;

    if (await this.deleteGroup(id))
      window.notify({ msg: "Group deleted", status: "error" });
    else window.notify({ msg: "Group not deleted", status: "error" });
  }
  async displayMember(id: string) {
    ;
    const group = await this.groups.find((d) => d.id == id);
    this.showMemberModal = true;
    this.paymentId = id;
  }
  async showDeactivateGroup(id: string) {
    const payment = await this.groups.find((d) => d.id == id);
    this.showDeativateModal = true;
    this.paymentId = id;
  }
  async activateGroup(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to activate this Group",
      title: "Activate Group",
    });
    if (!confirmed) {
      return;
    } else {
      try {
        const response = await cornieClient().post(
          `/api/v1/group/deactivateActivateGroupAccount/${id}`,
          {}
        );
        if (response.success) {
          window.notify({ msg: "Group activated", status: "success" });
        }
      } catch (error) {
        window.notify({ msg: "Group not activated", status: "error" });
        console.error(error);
      }
    }
  }
  get sortGroups() {
    return this.items.slice().sort(function (a, b) {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  }
  async created() {
    ;
  }
}
</script>
<style>
.outline-primary {
  border: 2px solid #080056;
}
</style>
