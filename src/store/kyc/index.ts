import ObjectSet from "@/lib/objectset";
import IKyc from "@/types/IKyc";
import IKycref from "@/types/IKycref";
import { StoreOptions } from "vuex";
import { fetchKycs, deleteRefree } from "./helper";

interface KycState {
  orgKyc: IKyc;
}

export default {
  namespaced: true,
  state: {
    orgKyc: {} as IKyc,
  },
  mutations: {
    setKycs(state, orgKyc: any) {
      state.orgKyc = orgKyc
    },
    updateKycs(
      state,
      orgKyc: IKyc
    ) {
      state.orgKyc = orgKyc;
    },
    addreferees(state, referees: IKycref[]){
      const existingRefs = state.orgKyc.referees || [];
      const refset = new ObjectSet(
        [...existingRefs, ...referees],
        "id"
      )
      state.orgKyc.referees = [...refset]
    },
    deleteRefree(state, id: string) {
      const index = state.orgKyc.referees.findIndex(
        refree => refree.id == id
      );
      if (index < 0) return;
      const refset = [...state.orgKyc.referees];
      refset.splice(index, 1);
      state.orgKyc.referees = [...refset];
    },
  },
  actions: {
    async fetchKycs(ctx) {
      const orgKyc = await fetchKycs();
      ctx.commit("setKycs", orgKyc);
    },
    async deleteRefree(ctx, id: string) {
      const deleted = await deleteRefree(id);
      if (!deleted) return false;
      ctx.commit("deleteRefree", id);
      return true;
    },
  },
} as StoreOptions<KycState>;
