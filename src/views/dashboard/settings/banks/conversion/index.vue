<template>
  <div
    class="w-full h-2/3 mt-8 flex flex-col justify-center items-center"
    v-if="empty3"
  >
    <img src="@/assets/img/nocurrency.svg" />
    <h3 class="text-center text-black mt-5">No collection account recorded</h3>
    <h4 class="text-black text-center">Add new account</h4>
    <button
      class="bg-danger rounded-full text-white mt-5 py-2 px-3 focus:outline-none hover:opacity-90"
      @click="showNewExchangeRateModal = true"
    >
      <bank-add-icon class="mt-1 mr-2" />
      New Exchange Rate
    </button>
    <new-exchange-rate v-model="showNewExchangeRateModal" />
  </div>
  <div class="w-full pb-80" v-else>
    <div class="w-full mt-5">
      <span class="flex justify-end">
        <button
          class="border-primary rounded-full text-primary outline-primary mt-5 text-sm mb-5 py-2 px-3 pl-6 pr-6 focus:outline-none hover:opacity-90 flex mr-6"
          @click="showDefaultCurrencyModal = true"
        >
          Set Default Currecncy
        </button>
        <button
          class="bg-danger rounded-full text-sm text-white mb-5 mt-5 py-2 pl-6 pr-6 px-4 focus:outline-none hover:opacity-90 flex"
          @click="showNewExchangeRateModal = true"
        >
          <span class="text-xl -mt-1.5 mr-2">+ </span>
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
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CardText from "@/components/cornie-card/CornieCardText.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import Table from "@scelloo/cloudenly-ui/src/components/table";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import NewExchangeRate from "./exchangeRate.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import TableOptions from "@/components/table-options.vue";
import search from "@/plugins/search";
import defaultCurrency from "./defaultCurrency.vue";
import { first, getTableKeyValue } from "@/plugins/utils";
import { Prop } from "vue-property-decorator";
import Select from "@/components/formselect.vue";
import SelectSurvey from "@/components/surveyselect.vue";
import DeleteIcon from "@/components/icons/deleteorange.vue";
import EyeIcon from "@/components/icons/yelloweye.vue";
import EditIcon from "@/components/icons/edit.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import TimelineIcon from "@/components/icons/timeline.vue";
import DangerIcon from "@/components/icons/danger.vue";
import NoteIcon from "@/components/icons/notes.vue";
import CheckinIcon from "@/components/icons/checkin.vue";
import UpdateIcon from "@/components/icons/newupdate.vue";
import PlusIcon from "@/components/icons/plus.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import MessageIcon from "@/components/icons/message.vue";
import { namespace } from "vuex-class";
import IPracticeform from "@/types/IPracticeform";
import { cornieClient } from "@/plugins/http";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import IPractitioner from "@/types/IPractitioner";
import ICurrency from "@/types/ICurrency";

const currency = namespace("currency");
const practitioner = namespace("practitioner");

@Options({
  components: {
    Table,
    CancelIcon,
    SortIcon,
    CheckinIcon,
    NewviewIcon,
    UpdateIcon,
    ChevronDownIcon,
    TimelineIcon,
    NewExchangeRate,
    SelectSurvey,
    NoteIcon,
    ThreeDotIcon,
    defaultCurrency,
    DangerIcon,
    Select,
    PlusIcon,
    SearchIcon,
    //  CloseIcon,
    MessageIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    ColumnFilter,
    TableOptions,
    DeleteIcon,
    EyeIcon,
    EditIcon,
    CornieTable,
    CardText,
    CornieDialog,
  },
})
export default class PracticeformExistingState extends Vue {
  showColumnFilter = false;
  showModal = false;
  loading = false;
  query = "";
  selected = 1;
  showNewExchangeRateModal = false;
  showDefaultCurrencyModal = false;
  currencyId = "";

  @currency.State
  currencys!: ICurrency[];

  @currency.Action
  deleteCurrency!: (id: string) => Promise<boolean>;

  @currency.Action
  fetchCurrencys!: () => Promise<void>;

  @practitioner.State
  practitioners!: IPractitioner[];

  @practitioner.Action
  fetchPractitioners!: () => Promise<void>;

  getKeyValue = getTableKeyValue;

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
    { title: "Outlets(s)", key: "outlets", show: true },
    { title: "LAST UPDATED", key: "updatedAt", show: true },
    { title: "LAST UPDATED BY", key: "updatedByUser", show: true },
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
      (currency as any).updatedAt = new Date(
        (currency as any).updatedAt
      ).toLocaleDateString("en-US");
      return {
        ...currency,
        action: currency.id,
        outlets: "All Locations Selected",
        updatedByUser: this.getUser(currency.updatedByUser),
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

  async showRateModal(value: string) {
    this.showNewExchangeRateModal = true;
    this.currencyId = value;
  }
  select(i: number) {
    this.selected = i;
  }
  getUser(id: string) {
    const pt = this.practitioners.find((i: any) => i.id === id);
    return pt ? `${pt.firstName} ${pt.lastName}` : "";
  }
  get empty3() {
    return this.currencys.length < 1;
  }

  async created() {
    this.fetchPractitioners();
    this.fetchCurrencys();
    if (this.currencys.length < 1) this.fetchCurrencys();
  }
}
</script>
<style>
.outline-primary {
  border: 2px solid #080056;
}
.status-accepted {
  background: #f3fcf8;
  color: #35ba83;
}
.status-inactive {
  background: #fff1f0;
  color: #fe4d3c;
}
.status-warning {
  background: #fefaf0;
  color: #f7b538;
}
</style>
