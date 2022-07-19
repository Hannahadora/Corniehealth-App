import ObjectSet from "@/lib/objectset";
import Ihistory from "@/types/Ihistory";
import { StoreOptions } from "vuex";
import { deleteHistory, fetchHistorys } from "./helper";
import IPageInfo from "@/types/IPageInfo";

interface HistoryState {
  historys: Ihistory[];
  pageInfo : IPageInfo;
}

export default {
  namespaced: true,
  state: {
    historys: [],
    pageInfo: {},
  },
  mutations: {
    setPageInfo(state, pageInfo){
      state.pageInfo = pageInfo;
    },
    setHistorys(state, historys: Ihistory[]) {
      state.historys = [...historys];
    },
    updateHistorys(state, historys: Ihistory[]) {
      const historySet = new ObjectSet([...state.historys, ...historys], "id");
      state.historys = [...historySet];
    },
    deleteHistory(state, id: string) {
      const index = state.historys.findIndex(history => history.id == id);
      if (index < 0) return;
      const historys = [...state.historys];
      historys.splice(index, 1);
      state.historys = [...historys];
    },
  },
  actions: {
    async fetchHistorys(ctx, patientId: string) {
      const historys = await fetchHistorys(patientId);
      ctx.commit("setHistorys", historys);
    },
    // async fetchHistorys(ctx, payload : {patientId: string, page:number, limit:number}, ) {
    //   const { page, limit, patientId } = payload ?? {}
    //   const { data, pageInfo } = await fetchHistorys(patientId, page ?? 1, limit ?? 10);
    //   ctx.commit("setHistorys", data);
    //   ctx.commit("setPageInfo", pageInfo);
    // },
    async gethistoryById(ctx, id: string) {
      if (ctx.state.historys.length < 1) await ctx.dispatch("fetchHistorys");
      return ctx.state.historys.find(history => history.id == id);
    },
    async deleteHistory(ctx, id: string) {
      const deleted = await deleteHistory(id);
      if (!deleted) return false;
      ctx.commit("deleteHistory", id);
      return true;
    },
  },
} as StoreOptions<HistoryState>;
