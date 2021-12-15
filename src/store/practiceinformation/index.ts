import ObjectSet from "@/lib/objectset"
import IPracticeInformation from "@/types/IPracticeInformation"
import IPracticeHour from "@/types/IPracticeHours"
import { StoreOptions } from "vuex"
import { fetchPracticeInformations, fetchPracticeHours } from "./helper"

interface IPracticeInformationState {
  practiceInformations: IPracticeInformation[];
  practiceHours: IPracticeHour[];
}

export default {
    namespaced: true,
    state: {
        practiceInformations: [],
        practiceHours: [],
    },
    mutations: {
        setPracticeInformations(state, practiceInformations: IPracticeInformation[]) {
            state.practiceInformations = practiceInformations
        },
        setPracticeHours(state, practiceHours: IPracticeHour[]) {
            state.practiceHours = practiceHours
        },
        updatePracticeInformations(state, practiceInformations: IPracticeInformation[]) {
            const practiceInformationSet = new ObjectSet([...state.practiceInformations, ...practiceInformations], "id")
            state.practiceInformations = [...practiceInformationSet]
        },
        updatePracticeHours(state, practiceHours: IPracticeHour[]) {
            const practiceHourSet = new ObjectSet([...state.practiceHours, ...practiceHours], "id")
            state.practiceHours = [...practiceHourSet]
        },
       
    },
    actions: {
        async fetchPracticeInformations(ctx) {
            const practiceInformations = await fetchPracticeInformations()
            ctx.commit("setPracticeInformations", practiceInformations)
        },
        async fetchPracticeHours(ctx) {
            const practiceHours = await fetchPracticeHours()
            ctx.commit("setPracticeHours", practiceHours)
        },
        async getPracticeinformationById(ctx, id: string) {
            if (ctx.state.practiceInformations.length < 1) await ctx.dispatch("setPracticeInformations")
            return ctx.state.practiceInformations.find(practiceInformation => practiceInformation.id == id)
        },
        async getPracticeHourById(ctx, id: string) {
            if (ctx.state.practiceHours.length < 1) await ctx.dispatch("setPracticeHours")
            return ctx.state.practiceHours.find(practiceHour => practiceHour.id == id)
        },
    },
} as StoreOptions<IPracticeInformationState>
