import ObjectSet from "@/lib/objectset"
import { ICondition } from "@/types/ICondition"
import { StoreOptions } from "vuex"
import { fetchPatientConditions } from "./helper"

interface ConditionState {
	conditions: { [state: string]: ICondition[] };
}
interface Payload {
	patientId: string;
	conditions: ICondition[];
}
export default {
    namespaced: true,
    state: {
        conditions: {},
    },
    mutations: {
        setPatientConditions(state, { patientId, conditions }: Payload) {
            const patientConditions = state.conditions[patientId] || []
            const conditionSet = new ObjectSet(
                [...patientConditions, ...conditions],
                "id"
            )
            state.conditions[patientId] = [...conditionSet]
        },
    },
    actions: {
        async fetchPatientConditions(ctx, patientId: string) {
            const conditions = await fetchPatientConditions(patientId)


            ctx.commit("setPatientConditions", { patientId, conditions })
        },
    },
} as StoreOptions<ConditionState>
