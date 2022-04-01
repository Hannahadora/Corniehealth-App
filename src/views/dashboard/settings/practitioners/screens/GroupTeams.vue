<template>
  <div>
    <screen-header :properties="properties"> Group & Teams </screen-header>
    <div v-if="empty">
      <cornie-table :columns="rawHeaders" v-model="sortGroups">
        <template #actions="{ item }">
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="$router.push(`/dashboard/provider/view-group/${item.id}`)"
          >
            <eye-yellow class="text-blue-500 fill-current" />
            <span class="ml-3 text-xs">View</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="$router.push(`/dashboard/provider/add-group/${item.id}`)"
          >
            <edit-icon class="mr-3 fill-current text-primary" />
            <span class="ml-3 text-xs">Edit</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="handleSuspendGroup(item.id)"
          >
            <cancel-icon />
            <span class="ml-3 text-xs">Suspend</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showDeactivateGroup(item.id)"
          >
            <not-allowed class="fill-current text-red-500" />
            <span class="ml-3 text-xs">Deactivate</span>
          </div>
        </template>
      </cornie-table>
    </div>
    <div class="w-full flex flex-col justify-center items-center h-96" v-else>
      <img src="@/assets/img/Group.svg" />
      <h3 class="text-center font-extrabold text-lg mt-5">
        Practitioner doesn’t belong to any groups & teams
      </h3>
      <h1 class="text-md text-gray-400">
        Groups & teams practitioner belongs to will be displayed here
      </h1>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
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
import DeleteRed from "@/components/icons/delete-red.vue";
// import MemberModal from "./memberModal.vue";
// import DeactivateModal from "./deactivateModal.vue";
import EyeYellow from "@/components/icons/eye-yellow.vue";
import EditIcon from "@/components/icons/edit.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import CancelIcon from "@/components/icons/cancel.vue";
import NotAllowed from "@/components/icons/not-allowed.vue";
import Check from "@/components/icons/check.vue";
import ScreenHeader from "./Header.vue";

// import UpdateStatusDiag from "./components/UpdateStatus.vue";
// import AddMemberDiag from "./components/AddMember.vue";

const group = namespace("group");

@Options({
  components: {
    ScreenHeader,
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
    DeleteRed,
    EyeYellow,
    EditIcon,
    // MemberModal,
    // DeactivateModal,
    NotAllowed,
    Check,
    // UpdateStatusDiag,
    // AddMemberDiag,
  },
})
export default class GroupTeams extends Vue {
  showColumnFilter = false;
  showModal = false;
  loading = false;
  query = "";
  showMemberModal = false;
  showDeativateModal = false;
  paymentId = "";
  showUpdateStatusDiag = false;
  showAddMemberDiag = false;

  @group.State
  groups!: IGroup[];

  @group.Action
  deleteGroup!: (id: string) => Promise<boolean>;

  @group.Action
  fetchGroups!: () => Promise<void>;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];

  @Prop({ default: {} })
  properties!: any;

  get empty() {
    console.log(this.groups);
    return !Boolean(this.groups.length < 1);
  }

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
      key: "state",
      show: true,
    },
    {
      title: "Managing Entity",
      key: "managingEntity",
      show: false,
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
      message:
        "Are you sure you want to delete this group? This action cannot be undone.",
      title: "Delete Group",
    });
    if (!confirmed) return;

    if (await this.deleteGroup(id))
      window.notify({ msg: "Group deleted", status: "error" });
    else window.notify({ msg: "Group not deleted", status: "error" });
  }
  async displayMember(id: string) {
    const group = await this.groups.find((d) => d.id == id);
    this.showMemberModal = true;
    this.paymentId = id;
  }
  async showDeactivateGroup(id: string) {
    const payment = await this.groups.find((d) => d.id == id);
    this.showDeativateModal = true;
    this.paymentId = id;
  }

  async handleMarkProposed(id: string) {}

  async handleSuspendGroup(id: string) {
    this.showUpdateStatusDiag = true;
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
    if (this.groups.length < 1) this.fetchGroups();
  }
}
</script>
