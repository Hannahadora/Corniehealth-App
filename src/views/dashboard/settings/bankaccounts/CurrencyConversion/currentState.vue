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
      </span>
    </div>
    <Table :headers="header" :items="items" class="tableu rounded-xl mt-5">
      <template v-slot:item="{ item }">
        <span v-if="getKeyValue(item).key == 'more'">
          <three-dot-icon />
        </span>
        <span v-else> {{ getKeyValue(item).value }} </span>
      </template>
    </Table>
    <default-currency v-model:visible="showDefaultCurrencyModal" />
    <new-exchange-rate v-model:visible="showNewExchangeRateModal" />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Table from "@scelloo/cloudenly-ui/src/components/table";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
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

  headers = [
    {
      title: "CURRENCY",
      value: "currency",
    },
    { title: "CONVERSION", value: "conversion" },

    {
      title: "EXCHANGE RATE",
      value: "exchangeRate",
    },
    { title: "CREATED", value: "createdAt" },
    // Displaying Icon in the header - <table-setting-icon/>
  ];

  get header() {
    return [...this.headers, { title: "", value: "action", image: true }];
  }

  get items() {
    const currencies = this.currencies.map((currency) => {
      (currency as any).createdAt = new Date(
        (currency as any).createdAt
      ).toLocaleDateString("en-US");

      return currency;
    });
    return currencies;
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
