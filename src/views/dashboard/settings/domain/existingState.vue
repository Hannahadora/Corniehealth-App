<template>
  <div class="w-full">
    <span class="flex justify-end w-full">
      <button
        class="outline-primary rounded-full text-black mt-5 mr-3 py-2 pr-10 pl-10 px-3 focus:outline-none hover:bg-primary hover:text-white"
        @click="$router.push('send-invite')"
      >
        + Invite
      </button>

      <button
        class="bg-danger rounded-full text-white mt-5 py-2 pr-5 pl-5 px-3 focus:outline-none hover:opacity-90"
        @click="$router.push('add-domain')"
      >
        Create New Domain
      </button>
    </span>
    <cornie-table :columns="rawHeaders" v-model="items">
      <template #actions="{ item }">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="$router.push(`add-domain/${item.id}`)"
        >
          <span class="mr-3 text-2xl bold text-primary">+</span> Rename
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="deleteItem(item.id)"
        >
          <delete-icon />
          <span class="ml-3 text-xs">Remove</span>
        </div>
      </template>
    </cornie-table>
    <!-- <Table :headers="headers" :items="items" class="tableu rounded-xl mt-5">
      <template v-slot:item="{ item }">
        <span v-if="getKeyValue(item).key == 'action'">
          <table-options>
            <li
              @click="$router.push(`add-domain/${getKeyValue(item).value}`)"
              class="
                list-none
                items-center
                flex
                text-xs
                font-semibold
                text-gray-700
                hover:bg-gray-100
                hover:text-gray-900
                cursor-pointer
                my-1
                py-3
              "
            >
              
              <span class="mr-3 text-2xl bold text-primary">+</span> Rename
            </li>
            <li
              @click="deleteItem(getKeyValue(item).value)"
              class="
                list-none
                flex
                my-1
                py-3
                items-center
                text-xs
                font-semibold
                text-gray-700
                hover:bg-gray-100
                hover:text-gray-900
                cursor-pointer
              "
            >
              <delete-icon class="mr-3" /> Remove
            </li>
          </table-options>
        </span>
        <span v-else> {{ getKeyValue(item).value }} </span>
      </template>
    </Table>
    <column-filter
      :columns="rawHeaders"
      v-model:preferred="preferredHeaders"
      v-model:visible="showColumnFilter"
    /> -->
    <!-- <show-confrim  v-model:visible="showModal"  yes="Proceed" no="Cancel" title="Delete Domain" message="Are you sure you want to remove this domain? This action cannot be undone."/>-->
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
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/eye.vue";
import { namespace } from "vuex-class";
import CornieTable from "@/components/cornie-table/CornieTable.vue";

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
  },
})
export default class DomainExistingState extends Vue {
  showColumnFilter = false;
  showModal = false;
  loading = false;
  query = "";

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
}
</script>
<style>
.outline-primary {
  border: 2px solid #080056;
}
</style>
