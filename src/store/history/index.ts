import ObjectSet from "@/lib/objectset";
import Ihistory from "@/types/Ihistory";
import { StoreOptions } from "vuex";
import { deleteHistory, fetchHistorys } from "./helper";

interface HistoryState {
  historys: Ihistory[];
}

export default {
    namespaced: true,
    state: {
        historys: [],
    },
    mutations: {
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
