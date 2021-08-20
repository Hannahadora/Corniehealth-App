<template>
  <div class="w-full pb-7">
    <div class="flex items-center mb-6">
      <span class="flex-grow"></span>
      <button
        class="
          bg-danger
          rounded-full
          text-white
          py-2
          px-6
          focus:outline-none
          hover:opacity-90
        "
        @click="$router.push({ name: 'New Designation'})"
      >
        <img src="@/assets/img/plus.svg" class="inline-block mr-2" />
        New Designation
      </button>
    </div>
    <div class="flex w-full justify-between mt-6 items-center">
      <span class="flex items-center">
        <sort-icon class="mr-5" />
        <icon-input
          class="border border-gray-600 rounded-full focus:outline-none"
          type="search"
          placeholder="Search Table"
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
          <table-options>
            <li
              @click="deletePartner(getKeyValue(item).value)"
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
              <delete-icon class="mr-3" /> Delete
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
import { namespace } from "vuex-class";
import TableOptions from "@/components/table-options.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/eye.vue";
import ICarePartner from "@/types/ICarePartner";

const CarePartnersStore = namespace("CarePartnersStore");

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
    DeleteIcon,
    EyeIcon,
    ColumnFilter,
    TableOptions,
  },
})
export default class CarePartnersExistingState extends Vue {
  showColumnFilter = false;
  query = "";

  @CarePartnersStore.State
  carePartners!: ICarePartner[];

  @CarePartnersStore.Action
  delete!: (partner: ICarePartner) => Promise<boolean>;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    {
      title: "Title",
      value: "functionName",
      show: true,
    },
    {
      title: "Job Level",
      value: "hierarchy",
      show: true,
    },
    {
      title: "Function",
      value: "supervisoryFunction",
      show: true,
    },
    {
      title: "Reporting To",
      value: "supervisoryFunction",
      show: true,
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
    const partners = this.carePartners.map((partner) => {
      return {
        ...partner,
        action: partner.id,
      };
    });
    if (!this.query) return partners;
    return search.searchObjectArray(partners, this.query);
  }

  async deletePartner(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this care partner",
    });
    if (!confirmed) return;
    const partner = this.carePartners.find((element) => element.id == id);
    if (partner && (await this.delete(partner))) alert("Care partner deleted");
    else alert("Care partner not deleted");
  }
}
</script>
