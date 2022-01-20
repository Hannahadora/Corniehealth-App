<template>
  <div class="h-screen flex justify-center">
    <empty-state v-if="empty" />
    <current-state @currency-added="currencyadded" v-else />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import emptyState from "./emptyState.vue";
import currentState from "./currentState.vue";
import ICurrency from "@/types/ICurrency";
import { namespace } from "vuex-class";
import CancelIcon from "@/components/icons/cancel.vue";

const currency = namespace("currency");
import { cornieClient } from "@/plugins/http";

@Options({
  components: {
    emptyState,
    currentState,
  },
})
export default class CurrencyConversion extends Vue {
  showNewExchangeRateModal = false;
  show = false;
  addAccount = false;
  get empty() {
    return this.currencys.length < 1;
  }

  @currency.State
  currencys!: ICurrency[];

  @currency.Action
  deleteCurrency!: (id: string) => Promise<boolean>;

  @currency.Action
  fetchCurrencys!: () => Promise<void>;

  currencyadded() {
    this.show = false;
    this.currencys;
    this.fetchCurrencys();
  }
  mounted() {
    this.fetchCurrencys();
  }

  created() {
    this.fetchCurrencys();
    if (this.currencys.length < 1) this.fetchCurrencys();
  }

  // showNewExchangeRateModal = false;
  // currencies = [] as ICurrency[];

  // addAccount = false;

  // get empty() {
  //   return this.currencies.length < 1;
  // }

  // async fetchCurrencies() {
  //   try {
  //     const response = await cornieClient().get(
  //       "/api/v1/currency/myOrg/conversions"
  //     );
  //     if (response.success) {
  //       this.currencies = [...response.data];
  //     } else ;
  //   } catch (error) {
  //     ;
  //   }
  // }

  // mounted() {
  //   this.fetchCurrencies();
  // }
}
</script>
