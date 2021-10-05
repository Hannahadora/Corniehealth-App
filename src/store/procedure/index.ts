import { StoreOptions } from "vuex";
import IProcedure from "../../types/IProcedure";
import { getProcedures, createProcedure, updateVitalStatus } from "./helper";

interface ProcedureStore {
  procedures: IProcedure[],
}

export default {
  namespaced: true,
  state: {
    procedures: [],
  },
  mutations: {

    setProcedures(state, procedures) {
      if (procedures && procedures.length > 0) state.procedures = [ ...procedures ];
    },

    // updateVitalStatus(state, payload) {
    //   if (payload.vitalId) {
    //     const index = state.vitals.findIndex(vital => vital.id === payload.vitalId);
    //     if (index >= 0) state.vitals[index].status = payload.status
    //   }
    // },
  },

  actions: {
    async getProcedures(ctx, patientId: string) {
      const procedures = await getProcedures(patientId);
      ctx.commit("setProcedures", procedures);
    },

    async createProcedure(ctx, procedure: IProcedure) {
      const res = await createProcedure(procedure);
      if (!res) return { };
      // ctx.commit("addVital", res);
      return res;
    },

    async updateVitalStatus(ctx, body: any) {
      const res = await updateVitalStatus(body.data, body.vitalId);
      if (!res) return { };
      ctx.commit("updateVitalStatus", { status: body.data?.status, vitalId: body.vitalId});
      return res;
    }
  },
} as StoreOptions<ProcedureStore>
