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
          mr-6
        "
        @click="showDefaultCurrencyModal = true"
      >
        <span class="mt-2 mr-2"> <bank-add-icon /> </span>
        Set Default Currecncy
      </button>
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
        @click="showNewExchangeRateModal = true"
      >
        <span class="mt-2 mr-2"> <bank-add-icon /> </span>
        New Exchange Rate
      </button>
    </span>
       <cornie-table :columns="rawHeaders" v-model="items" :check="false">
      <template #actions="{ item }">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="$router.push(`add-payment-account/${item.id}`)"
        >
          <eye-icon class="text-yellow-500 fill-current" />
          <span class="ml-3 text-xs">View</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="deleteItem(item.id)"
        >
          <delete-icon class="text-yellow-500 fill-current" />
          <span class="ml-3 text-xs">Delete</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="deleteItem(item.id)"
        >
          <close-icon class="text-yellow-500 fill-current" />
          <span class="ml-3 text-xs">Deactivate Account</span>
        </div>
      </template>
    </cornie-table>

  
    <default-currency v-model:visible="showDefaultCurrencyModal" />
    <new-exchange-rate v-model:visible="showNewExchangeRateModal" />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import Table from "@scelloo/cloudenly-ui/src/components/table";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import { first, getTableKeyValue } from "@/plugins/utils";
import PrintIcon from "@/components/icons/print.vue";
import IconInput from "@/components/IconInput.vue";
import BankAddIcon from "@/components/icons/bankadd.vue";
import { Prop } from "vue-property-decorator";
import ICurrency from "@/types/ICurrency";
import NewExchangeRate from "./newExchangeRate.vue";
import defaultCurrency from "./defaultCurrency.vue";
import search from "@/plugins/search";

@Options({
  components: {
    Table,
    SortIcon,
    CornieTable,
    ThreeDotIcon,
    SearchIcon,
    PrintIcon,
    IconInput,
    BankAddIcon,
    NewExchangeRate,
    defaultCurrency,
  },
})
export default class currentState extends Vue {
  @Prop({ type: Array, default: [] })
  currencies!: ICurrency[];

  query = "";

  showNewExchangeRateModal = false;
  showDefaultCurrencyModal = false;

  preferredHeaders = [];
  rawHeaders = [
    {
      title: "CURRENCY",
      key: "currency",
       show: true,
    },
    { title: "CONVERSION", key: "conversion", show: true, },

    {
      title: "EXCHANGE RATE",
      key: "exchangeRate",
       show: true,
    },
    { title: "CREATED", key: "createdAt" , show: true,},
    // Displaying Icon in the header - <table-setting-icon/>
  ];

  get header() {
    return [...this.rawHeaders, { title: "", value: "action", image: true }];
  }


  get items() {
    const currencies = this.currencies.map((currency) => {
      (currency as any).createdAt = new Date(
        (currency as any).createdAt
      ).toLocaleDateString("en-US");
        return {
        ...currency,
         action: currency.id,
        };
    });
    if (!this.query) {
      return currencies;
    } else {
      return search.searchObjectArray(currencies, this.query);
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
