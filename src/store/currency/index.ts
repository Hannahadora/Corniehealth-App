import ObjectSet from "@/lib/objectset";
import ICurrency from "@/types/ICurrency";
import { StoreOptions } from "vuex";
import { deleteCurrency, fetchCurrencys } from "./helper";

interface CurrencyState {
  currencys: ICurrency[];
}

export default {
  namespaced: true,
  state: {
    currencys: [],
  },
  mutations: {
    setCurrencys(state, currencys: ICurrency[]) {
      state.currencys = [...currencys];
    },
    updateCurrencys(state, currencys: ICurrency[]) {
      const currencySet = new ObjectSet(
        [...state.currencys, ...currencys],
        "id"
      );
      state.currencys = [...currencySet];
    },
    deleteCurrency(state, id: string) {
      const index = state.currencys.findIndex((currency) => currency.id == id);
      if (index < 0) return;
      const currencys = [...state.currencys];
      currencys.splice(index, 1);
      state.currencys = [...currencys];
    },
  },
  actions: {
    async fetchCurrencys(ctx) {
      const currencys = await fetchCurrencys();
      ctx.commit("setCurrencys", currencys);
    },
    async getCurrencyById(ctx, id: string) {
      if (ctx.state.currencys.length < 1) await ctx.dispatch("fetchCurrencys");
      return ctx.state.currencys.find((currency) => currency.id == id);
    },
    async deleteCurrency(ctx, id: string) {
      const deleted = await deleteCurrency(id);
      if (!deleted) return false;
      ctx.commit("deleteCurrency", id);
      return true;
    },
  },
} as StoreOptions<CurrencyState>;
