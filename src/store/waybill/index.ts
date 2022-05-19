import ObjectSet from "@/lib/objectset";
import IWaybill from "@/types/IWaybill";
import { StoreOptions } from "vuex";
import { fetchWaybillIncoming, fetchWaybillOutgoing} from "./helper";

interface WaybillState {
    waybills: IWaybill[];
}

export default {
  namespaced: true,
  state: {
    waybills: [],
  },
  mutations: {
    setWaybill(state, waybills: any) {
      state.waybills = [...waybills];
    },
    updateWaybill(state, waybills: IWaybill[]) {
      const waybillSet = new ObjectSet([...state.waybills, ...waybills], "id");
      state.waybills = [...waybillSet];
    },
  },
  actions: {
    async fetchWaybillIncoming(ctx, locaitonId: string) {
      const waybills = await fetchWaybillIncoming(locaitonId);
      ctx.commit("setWaybill", waybills);
    },
    async fetchWaybillOutgoing(ctx, locaitonId: string) {
      const waybills = await fetchWaybillOutgoing(locaitonId);
      ctx.commit("setWaybill", waybills);
    },
    async getWaybillById(ctx, id: string) {
      if (ctx.state.waybills.length < 1) await ctx.dispatch("fetchWaybillIncoming");
      return ctx.state.waybills.find(waybill => waybill.id == id);
    },
    async getWaybillOutgoingById(ctx, id: string) {
      if (ctx.state.waybills.length < 1) await ctx.dispatch("fetchWaybillOutgoing");
      return ctx.state.waybills.find(waybill => waybill.id == id);
    },
  },
} as StoreOptions<WaybillState>;
