<template>
  <div class="w-full mx-5">
    <span class="flex justify-end">
      <button
        class="
          bg-danger
          rounded-full
          text-white
          mt-5
          py-2
          px-3
          focus:outline-none
          hover:opacity-90
          flex
        "
      >
        <span class="mt-2 mr-2"> <bank-add-icon /> </span>

        <p>
          <router-link to="/dashboard/settings/bank-accounts/add-collection"
            >New Account</router-link
          >
        </p>
      </button>
    </span>
    <div class="flex w-full justify-between mt-5 items-center">
      <span class="flex items-center">
        <sort-icon class="mr-5" />
        <icon-input
          class="border border-gray-600 rounded-full focus:outline-none"
          type="search"
        >
          <template v-slot:prepend>
            <search-icon />
          </template>
        </icon-input>
      </span>
      <span class="flex justify-between items-center">
        <three-dot-icon class="mr-7" />
        <print-icon class="mr-7" />
        <table-refresh-icon class="mr-7" />
        <filter-icon
          class="cursor-pointer"
          @click="showAdvancedFilters = true"
        />
      </span>
    </div>
    <Table :headers="headers" :items="items" class="tableu rounded-xl mt-5">
      <template v-slot:item="{ item }">
        <span v-if="getKeyValue(item).key == 'more'">
          <three-dot-icon @click="showExtraModal = true" />
        </span>
        <span v-else> {{ getKeyValue(item).value }} </span>
      </template>
    </Table>
    <extra-modal v-model:visible="showExtraModal" />
    <advanced-filters v-model:visible="showAdvancedFilters" />
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
import TableSettingIcon from "@/components/icons/tablesetting.vue";
import BankAddIcon from "@/components/icons/bankadd.vue";
import extraModal from "../Payment/extraModal.vue";
import AdvancedFilters from "../Payment/advancedFilters.vue";
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
    BankAddIcon,
    TableSettingIcon,
    extraModal,
    AdvancedFilters,
  },
})
export default class BankAccountsExistingState extends Vue {
  headers = [
    {
      title: "ACCOUNT NAME",
      value: "accountName",
    },
    { title: "ACCOUNT NUMBER", value: "accountNumber" },
    { title: "Location(s)", value: "Location" },
    { title: "Status", value: "status" },
    {
      title: "PAYMENT CATEGORY(IES)",
      value: "paymentCategory",
    },
    // Displaying Icon in the header - <table-setting-icon/>
    { title: "", value: "more", image: true },
  ];
  items = [
    {
      accountName: "Scelloo Limited",
      accountNumber: "0222315465, WEMA Bank",
      Location: "All Locations Selected",
      status: "Active",
      paymentCategory: "Supplier Invoices",
      more: "",
    },
    {
      accountName: "Scelloo Limited",
      accountNumber: "0222315465, WEMA Bank",
      Location: "All Locations Selected",
      status: "Inactive",
      paymentCategory: "Supplier Invoices",
      more: "",
    },
    {
      accountName: "Scelloo Limited",
      accountNumber: "0222315465, WEMA Bank",
      Location: "All Locations Selected",
      status: "Active",
      paymentCategory: "Supplier Invoices",
      more: "",
    },
    {
      accountName: "Scelloo Limited",
      accountNumber: "0222315465, WEMA Bank",
      Location: "All Locations Selected",
      status: "Inactive",
      paymentCategory: "Supplier Invoices",
      more: "",
    },
  ];

  showExtraModal = false;
  showAdvancedFilters = false;

  getKeyValue(item: any) {
    const { data, index, ...rest } = item;
    const key = Object.values(rest)[0] as string;
    const value = data[key];
    return {
      key,
      value,
      index,
    };
  }
}
</script>
<style>
table thead th {
  background: #0a4269 !important;

  color: white !important;
}
table thead th:first-child {
  border-top-left-radius: 0.4rem 0.4rem !important;
}
table thead th:last-child {
  border-top-right-radius: 0.4rem 0.4rem !important;
}
table thead tr th {
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
}

table tbody td {
  padding-top: 1.5rem !important;
  padding-bottom: 1.5rem !important;
}
table tbody tr {
  border: 1px solid #b8c3de;
}
table tbody tr:nth-child(even) {
  background-color: white !important;
}
</style>