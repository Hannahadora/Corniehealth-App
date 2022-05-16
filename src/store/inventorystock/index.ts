import ObjectSet from "@/lib/objectset";
import IInventroyStock from "@/types/IInventroyStock";
import { StoreOptions } from "vuex";
import { fetchInventorystocks, } from "./helper";

interface InventorystockState {
  inventorystocks: IInventroyStock[];
}

export default {
  namespaced: true,
  state: {
    inventorystocks: [],
  },
  mutations: {
    setInventorystocks(state, inventorystocks: IInventroyStock[]) {
      state.inventorystocks = [...inventorystocks];
    },
    updateInventorystocks(state, inventorystocks: IInventroyStock[]) {
      const inventorystockSet = new ObjectSet([...state.inventorystocks, ...inventorystocks], "id");
      state.inventorystocks = [...inventorystockSet];
    },
  },
  actions: {
    async fetchInventorystocks(ctx, locaitonId: string) {
      const inventorystocks = await fetchInventorystocks(locaitonId);
      ctx.commit("setInventorystocks", inventorystocks);
    },
    async getInventoryStockById(ctx, id: string) {
      if (ctx.state.inventorystocks.length < 1) await ctx.dispatch("fetchInventorystocks");
      return ctx.state.inventorystocks.find(inventorystock => inventorystock.id == id);
    },
  },
} as StoreOptions<InventorystockState>;
