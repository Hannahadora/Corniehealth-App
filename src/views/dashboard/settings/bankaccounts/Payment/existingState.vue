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
        @click="$emit('add-account')"
      >
        <span class="mt-2 mr-2"> <bank-add-icon /> </span>
        New Account
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
        <filter-icon
          class="cursor-pointer"
          @click="showAdvancedFilters = true"
        />
      </span>
    </div>
    <Table :headers="header" :items="items"  class="tableu rounded-xl mt-5">
      <template v-slot:item="{ item }">
        <span v-if="getKeyValue(item).key == 'action'">
          <three-dot-icon
           class="cursor-pointer"
           @click="showExtraModal = true" />
        </span>
        <span v-else> {{ getKeyValue(item).value }} </span>

      </template>
    </Table>
    <column-filter
      :columns="headers"
     v-model:visible="showAdvancedFilters"
    />
    <extra-modal v-model:visible="showExtraModal" />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Table from "@scelloo/cloudenly-ui/src/components/table";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import TableSettingIcon from "@/components/icons/tablesetting.vue";
import BankAddIcon from "@/components/icons/bankadd.vue";
import extraModal from "./extraModal.vue";
import { Prop } from "vue-property-decorator";
import IPayment from "@/types/IPayment";
import search from "@/plugins/search";
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
    ColumnFilter
  },
})
export default class BankAccountsExistingState extends Vue {

  
 @Prop({ type: Array, default: [] })
  payments!: IPayment[];

  query = "";

  headers = [
    {
      title: "ACCOUNT NAME",
      value: "accountName",
    },
    { title: "ACCOUNT NUMBER", value: "accountNumber" },
    { title: "Location(s)", value: "location" },
    {
      title: "PAYMENT CATEGORY(IES)",
      value: "paymentCategories",
    },
    

    
  ];

  
  showExtraModal = false;
  showAdvancedFilters = false;
  columns = [
    { selected: false, name: "Car" },
    { selected: false, name: "Bus" },
  ];

   get header() {
    return [...this.headers, { title: "", value: "action", image: true }];
  }

   get items() {
    if(!this.query){
    return this.payments;
    }
    else{
       return search.searchObjectArray(this.payments, this.query);
    }
  }

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
