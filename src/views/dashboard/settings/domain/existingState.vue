<template>
  <div class="w-full">
    <domain-dialog v-model="addNewDomain" center :title="title">
      <add-domain
        @close-add-domain-diag="handleCloseAddDomain"
        :id="domainId"
      ></add-domain>
    </domain-dialog>
    <domain-dialog v-model="addNewInvite" center title="Invite Domain">
      <send-invite @close-add-invite="addNewInvite = false"></send-invite>
    </domain-dialog>
    <span class="flex justify-end w-full">
      <button
        class="outline-primary rounded-md text-black mt-5 mr-3 py-2 pr-10 pl-10 px-3 focus:outline-none hover:bg-primary hover:text-white"
        @click="addNewInvite = true"
      >
        + Invite
      </button>

      <button
        class="bg-danger rounded-md text-white mt-5 py-2 pr-5 pl-5 px-3 focus:outline-none hover:opacity-90"
        @click="addNewDomain = true"
      >
        Create New Domain
      </button>
    </span>
    <div
      class="flex border-b-2 w-full font-semibold text-xl text-primary py-2 mx-auto mt-10 mb-4"
    >
      Account Owner
    </div>
    <cornie-table :columns="rawHeaders" v-model="items">
      <template #actions="{ item }">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="makeDefault(item.id)"
        >
          <check-icon />
          <span class="ml-3">Make Default</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="handleRename(item.id)"
        >
          <span class="mr-3 text-xl bold" style="color: #35ba83 !important"
            >+</span
          >
          Rename
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="deleteItem(item.id)"
        >
          <delete-icon />
          <span class="ml-3">Remove from organization</span>
        </div>
      </template>
    </cornie-table>
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
import IDomain from "@/types/IDomain";
import DeleteIcon from "@/components/icons/delete-red.vue";
import CheckIcon from "@/components/icons/check-green-bg.vue";
import EyeIcon from "@/components/icons/eye.vue";
import { namespace } from "vuex-class";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import DomainDialog from "@/components/domain-dialog.vue";
import AddDomain from "./addDomain.vue";
import SendInvite from "./sendInvite.vue";

const domain = namespace("domain");

@Options({
  components: {
    Table,
    SortIcon,
    ThreeDotIcon,
    SearchIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    ColumnFilter,
    TableOptions,
    DeleteIcon,
    EyeIcon,
    CornieTable,
    CheckIcon,
    DomainDialog,
    AddDomain,
    SendInvite,
  },
})
export default class DomainExistingState extends Vue {
  showColumnFilter = false;
  showModal = false;
  loading = false;
  query = "";
  addNewDomain = false as boolean;
  addNewInvite = false as boolean;
  domainId = "" as String;

  @domain.State
  domains!: IDomain[];

  @domain.Action
  deleteDomain!: (id: string) => Promise<boolean>;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    { title: "Organizatin Name", key: "orgName", show: true },
    { title: "Domain Name", key: "domainName", show: true },
    {
      title: "Role",
      key: "roleForDomain",
      show: true,
    },
    {
      title: "Date Created",
      key: "createdAt",
      show: false,
    },
    {
      title: "Organization ID",
      key: "organizationId",
      show: false,
    },
  ];

  get title() {
    return this.domainId ? "Update Domain" : "Create New Domain";
  }

  get headers() {
    const preferred =
      this.preferredHeaders.length > 0
        ? this.preferredHeaders
        : this.rawHeaders;
    const headers = preferred.filter((header) => header.show);
    return [...first(4, headers), { title: "", value: "action", image: true }];
  }

  get items() {
    const domains = this.domains.map((domain) => {
      (domain as any).createdAt = new Date(
        (domain as any).createdAt
      ).toLocaleDateString("en-US");
      (domain as any).action = domain.id;
      return {
        ...domain,
      };
    });

    if (!this.query) return domains;
    return search.searchObjectArray(domains, this.query);
  }

  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this domain",
      title: "Delete Domain Name",
    });
    if (!confirmed) return;

    if (await this.deleteDomain(id))
      window.notify({ msg: "Domain deleted", status: "error" });
    else window.notify({ msg: "Domain not deleted", status: "error" });
  }

  async makeDefault(id: string) {
    const confirmed = await window.confirmAction({
      message:
        "Are you sure you want to make this account your default account?",
      title: "Make default",
    });

    if (!confirmed) return;

    return;
  }

  async handleCloseAddDomain() {
    this.addNewDomain = false;
    this.domainId = "";
  }

  async handleRename(id: string) {
    this.domainId = id;

    this.addNewDomain = true;
  }
}
</script>
