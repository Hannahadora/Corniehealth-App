import IPrefrence from "@/types/IPrefrence";
import { StoreOptions } from "vuex";
import { fetchPrefrences } from "./helper";

interface PrefrenceState {
  prefrences: IPrefrence[];
}

export default {
    namespaced: true,
    state: {
        prefrences: [],
    },
    mutations: {
        setPrefrences(state, prefrences: any) {
            state.prefrences = [prefrences]
        },
    },
    actions: {
        async fetchPrefrences(ctx) {
            const prefrences = await fetchPrefrences();
            ctx.commit("setPrefrences", prefrences);
        },
        getPrefrenceById(ctx, id: string) {
            return ctx.state.prefrences.find(
                prefrence => prefrence.id == id
            )
        },
    },
} as StoreOptions<PrefrenceState>;
