import { StoreOptions } from "vuex"
import IProcedure from "../../types/IProcedure"
import {
    getProcedures,
    createProcedure,
    updateVitalStatus,
    updateProcedure,
} from "./helper"

interface ProcedureStore {
  procedures: IProcedure[];
}

export default {
    namespaced: true,
    state: {
        procedures: [],
    },
    mutations: {
        setProcedures(state, procedures) {
            if (procedures && procedures.length > 0)
                state.procedures = [...procedures]
        },

        updateProcedure(state, payload) {
            if (payload) {
                const index = state.procedures.findIndex(
                    procedure => procedure.id === payload.id
                )
                if (index >= 0) state.procedures[index] = payload
            }
        },
    },

    actions: {
        async getProcedures(ctx, patientId: string) {
            const procedures = await getProcedures(patientId)
            ctx.commit("setProcedures", procedures)
        },

        async createProcedure(ctx, procedure: IProcedure) {
            const res = await createProcedure(procedure)
            if (!res) return {}
            getProcedures(procedure.patientId)
            return res
        },

        async updateVitalStatus(ctx, body: any) {
            const res = await updateVitalStatus(body.data, body.vitalId)
            if (!res) return {}
            ctx.commit("updateVitalStatus", {
                status: body.data?.status,
                vitalId: body.vitalId,
            })
            return res
        },

        async updateProcedure(ctx, body: IProcedure) {
            const res = await updateProcedure(body, body.id)

            if (!res) return {}
            ctx.commit("updateProcedure", res)
            return res
        },
    },
} as StoreOptions<ProcedureStore>
