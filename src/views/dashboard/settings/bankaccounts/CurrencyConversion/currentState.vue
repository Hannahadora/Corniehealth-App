<template>
  <div class="w-full mx-5">
    <span class="flex justify-end">
      <button
        class="bg-danger rounded-lg text-white mt-5 text-sm mb-5 py-2 px-3 focus:outline-none hover:opacity-90 flex mr-6"
        @click="showDefaultCurrencyModal = true"
      >
        <bank-add-icon class="mt-1 mr-2" />
        Set Default Currecncy
      </button>
      <button
        class="bg-danger rounded-full text-sm text-white mb-5 mt-5 py-2 px-3 focus:outline-none hover:opacity-90 flex"
        @click="showNewExchangeRateModal = true"
      >
        <bank-add-icon class="mt-1 mr-2" />
        New Exchange Rate
      </button>
    </span>
    <cornie-table :columns="rawHeaders" v-model="sortCurrency" :check="false">
      <template #actions="{ item }">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="showRateModal(item.id)"
        >
          <eye-icon class="text-yellow-500 fill-current" />
          <span class="ml-3 text-xs">View & Edit</span>
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

    <default-currency v-model="showDefaultCurrencyModal" />
    <new-exchange-rate
      v-model="showNewExchangeRateModal"
      @currency-added="currencyadded"
      :id="currencyId"
    />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
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
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/eye.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import CancelIcon from "@/components/icons/cancel.vue";

const currency = namespace("currency");

@Options({
  components: {
    SortIcon,
    CornieTable,
    ThreeDotIcon,
    SearchIcon,
    PrintIcon,
    IconInput,
    BankAddIcon,
    NewExchangeRate,
    defaultCurrency,
    DeleteIcon,
    EyeIcon,
    CloseIcon,
  },
})
export default class currentState extends Vue {
  @currency.State
  currencys!: ICurrency[];

  @currency.Action
  deleteCurrency!: (id: string) => Promise<boolean>;

  @currency.Action
  fetchCurrencys!: () => Promise<void>;

  query = "";
  currencyId = "";
  showNewExchangeRateModal = false;
  showDefaultCurrencyModal = false;

  preferredHeaders = [];
  rawHeaders = [
    {
      title: "CURRENCY",
      key: "currency",
      show: true,
    },
    { title: "CONVERSION", key: "conversion", show: true },

    {
      title: "EXCHANGE RATE",
      key: "exchangeRate",
      show: true,
    },
    { title: "CREATED", key: "createdAt", show: true },
    // Displaying Icon in the header - <table-setting-icon/>
  ];

  get header() {
    return [...this.rawHeaders, { title: "", value: "action", image: true }];
  }

  get items() {
    const currencys = this.currencys.map((currency) => {
      (currency as any).createdAt = new Date(
        (currency as any).createdAt
      ).toLocaleDateString("en-US");
      return {
        ...currency,
        action: currency.id,
      };
    });
    if (!this.query) {
      return currencys;
    } else {
      return search.searchObjectArray(currencys, this.query);
    }
  }
  get sortCurrency() {
    return this.items.slice().sort(function (a, b) {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  }
  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this currency",
      title: "Delete Currency",
    });
    if (!confirmed) return;

    if (await this.deleteCurrency(id))
      window.notify({ msg: "Currency Deleted", status: "success" });
    else window.notify({ msg: "Currency Not Deleted", status: "error" });
  }
  async showRateModal(value: string) {
    this.showNewExchangeRateModal = true;
    this.currencyId = value;
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

  currencyadded() {
    this.fetchCurrencys();
  }
  created() {
    this.fetchCurrencys();
  }
}
</script>
