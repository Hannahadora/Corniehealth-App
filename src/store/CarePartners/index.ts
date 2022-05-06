import ObjectSet from "@/lib/objectset";
import ICarePartner from "@/types/ICarePartner";
import { StoreOptions } from "vuex";
import { fetchCarePartners, deleteCarepartner, search } from "./helper";

interface CarePartnersStore {
  carePartners: ICarePartner[];
}
export default <StoreOptions<CarePartnersStore>>{
  namespaced: true,
  state: {
    carePartners: [],
  },

  mutations: {
    setCarePartners(state, carePartners: ICarePartner[]) {
      state.carePartners = [...carePartners];
    },
    updateCarePartners(state, carePartners: ICarePartner[]) {
      const carepartnerSet = new ObjectSet(
        [...state.carePartners, ...carePartners],
        "id"
      );
      state.carePartners = [...carepartnerSet];
    },
    deleteCarepartner(state, id: string) {
      const index = state.carePartners.findIndex(carePartner => carePartner.id == id);
      if (index < 0) return;
      const carePartners = [...state.carePartners];
      carePartners.splice(index, 1);
      state.carePartners = [...carePartners];
    },
  },

  actions: {
    async fetchCarePartners(ctx) {
      const carePartners = await fetchCarePartners();
      ctx.commit("setCarePartners", carePartners);
    },
    async getCarepartnerById(ctx, id: string) {
      if (ctx.state.carePartners.length < 1) await ctx.dispatch("fetchCarePartners");
      return ctx.state.carePartners.find(carePartner => carePartner.id == id);
    },
    async deleteCarepartner(ctx, id: string) {
      const deleted = await deleteCarepartner(id);
      if (!deleted) return false;
      ctx.commit("deleteCarepartner", id);
      return true;
    },

    async search(context, payload: { q: string }): Promise<ICarePartner[]> {
      return await search(payload);
    },
  },
};
