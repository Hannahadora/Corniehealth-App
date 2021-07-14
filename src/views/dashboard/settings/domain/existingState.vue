<template>
  <div class="w-full">
    <span
        class="
          flex
          border-b-2
          w-full
          font-semibold
          text-xl text-primary
          py-2
          mx-auto
        "
      >
        Domains
      </span>
    <span class="flex justify-end w-full">
    <button
        class="
          outline-primary
          rounded-full
          text-black
          mt-5
          mr-3
          py-2
          pr-10
          pl-10
          px-3
          focus:outline-none
          hover:bg-primary
          hover:text-white

        "
        @click="$emit('send-invite')"
      >
        + Invite
      </button>

      <button
        class="
          bg-danger
          rounded-full
          text-white
          mt-5
          py-2
          pr-5
          pl-5
          px-3
          focus:outline-none
          hover:opacity-90
        "
        @click="$emit('add-domain')"
      >
        Create New Domain
      </button>
      
    </span>
    <div class="flex w-full justify-between mt-5 items-center">
      <span class="flex items-center">
        <sort-icon class="mr-5" />
        <icon-input
          class="border border-gray-600 rounded-full focus:outline-none"
          type="search"
          v-model="query"
        >
          <template v-slot:prepend>
            <search-icon />
          </template>
        </icon-input>
      </span>
      <span class="flex justify-between items-center">
        <print-icon class="mr-7" />
        <table-refresh-icon class="mr-7" />
        <filter-icon class="cursor-pointer" @click="showColumnFilter = true" />
      </span>
    </div>
    <Table :headers="headers" :items="items" class="tableu rounded-xl mt-5">
      <template v-slot:item="{ item }">
        <span v-if="getKeyValue(item).key == 'action'">
          <three-dot-icon
            class="cursor-pointer"
          />
        </span>
        <span v-else> {{ getKeyValue(item).value }} </span>
      </template>
    </Table>
   <!-- <Table :headers="headers" :items="items" class="tableu rounded-xl mt-5">
      <template v-slot:item="{ item }">
        <span v-if="getKeyValue(item).key == 'action'">
          <three-dot-icon
            class="cursor-pointer"
            @click="updateDomain(item.data.id)"
          />
        </span>
        <span v-else> {{ getKeyValue(item).value }} </span>
      </template>
    </Table>-->
    <column-filter
      :columns="rawHeaders"
      v-model:preferred="preferredHeaders"
      v-model:visible="showColumnFilter"
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
import search from "@/plugins/search";
import { first, getTableKeyValue } from "@/plugins/utils";
import { Prop } from "vue-property-decorator";
import IDomain from "@/types/IDomain";

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
  },
})
export default class DomainExistingState extends Vue {
  showColumnFilter = false;
  query = "";

  @Prop({ type: Array, default: [] })
  domains!: IDomain[];

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    {
      title: "Domain Name",
      value: "name",
      show: true,
    },
    { title: "Accounts", value: "accounts", show: true },
    { title: "Domain Name", value: "domainName", show: true },
    {
      title: "Email",
      value: "email",
      show: true,
    },
    {
      title: "Date Created",
      value: "dateCreated",
      show: false,
    },
    {
      title: "Account ID",
      value: "accountID",
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
      return {
        ...domain,
      };
    });
    if (!this.query) return domains;
    return search.searchObjectArray(domains, this.query);
  }


  updateDomain(id: string) {
    const domain = this.domains.find((l) => l.id == id);
    this.$emit("update-domain", domain);
  }
}
</script>
<style>
.outline-primary{
    border: 2px solid #0A4269;
}
</style>
