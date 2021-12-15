import IPrefrence from "@/types/IPrefrence"
import { StoreOptions } from "vuex"
import { fetchPrefrences } from "./helper"

interface PrefrenceState {
    prefrences: IPrefrence[];
}

export default {
    namespaced: true,
    state: {
        prefrences: [],
    },
    mutations: {
        setPrefrences(state, prefrences: IPrefrence[]) {
            state.prefrences = [...prefrences]
        },
    },
    actions: {
        async fetchPrefrences(ctx) {
            const prefrences = await fetchPrefrences()
            ctx.commit("setPrefrences", prefrences)
        },
        async getPrefrenceById(ctx, id: string) {
            if (ctx.state.prefrences.length < 1) await ctx.dispatch("fetchPrefrences")
            return ctx.state.prefrences.find(prefrence => prefrence.id == id)
        },
    },
} as StoreOptions<PrefrenceState>
