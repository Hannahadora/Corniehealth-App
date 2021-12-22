import ICancel from "@/types/ICancel";
import { StoreOptions } from "vuex";
import { fetchCancels } from "./helper";

interface CancelState {
  cancels: ICancel[];
}

export default {
    namespaced: true,
    state: {
        cancels: [],
    },
    mutations: {
        setCancels(state, cancels: any) {
            state.cancels = [cancels];
        },
    },
    actions: {
        async fetchCancels(ctx) {
            const cancels = await fetchCancels();
            ctx.commit("setCancels", cancels);
        },
        async getCancelById(ctx, id: string) {
            if (ctx.state.cancels.length < 1) await ctx.dispatch("fetchCancels");
            return ctx.state.cancels.find(cancel => cancel.id == id);
        },
    },
} as StoreOptions<CancelState>;
