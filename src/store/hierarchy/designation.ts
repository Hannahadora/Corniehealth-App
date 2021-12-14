import ObjectSet from "@/lib/objectset"
import { IDesignation } from "@/types/IDesignation"
import { CornieUser } from "@/types/user"
import { StoreOptions } from "vuex"
import { deleteDesignation, fetchDesignations } from "./helper"

interface DesignationState {
  designations: IDesignation[];
}

export default {
    namespaced: true,
    state: {
        designations: [],
    },
    mutations: {
        setDesignations(state, payload: IDesignation[]) {
            const designationSet = new ObjectSet(
                [...state.designations, ...payload],
                "id"
            )
            state.designations = [...designationSet]
        },
        deleteDesignation(state, id: string) {
            state.designations = state.designations.filter(d => d.id != id)
        },
    },
    actions: {
        async fetchDesignations(ctx) {
            const { organizationId } = ctx.rootGetters[
                "user/cornieUser"
            ] as CornieUser
            const designations = await fetchDesignations(organizationId)
            ctx.commit("setDesignations", designations)
        },
        async deleteDesignation(ctx, id: string) {
            const removed = await deleteDesignation(id)
            if (removed) ctx.commit("deleteDesignation")
        },
        async getDesignationById(ctx, id: string) {
            if (!ctx.state.designations.length)
                await ctx.dispatch("fetchDesignations")
            return ctx.state.designations.find(d => d.id == id)
        },
    },
} as StoreOptions<DesignationState>
