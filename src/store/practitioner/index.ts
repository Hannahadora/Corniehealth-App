import ObjectSet from "@/lib/objectset";
import search from "@/plugins/search";
import IPractitioner, { PractitionerLocationRole } from "@/types/IPractitioner";
import { StoreOptions } from "vuex";
import {
  deleteLocationrole,
  deletePractitioner,
  fetchPractitioners,
  getPractitioner,
} from "./helper";

interface PractitionerState {
  practitioners: IPractitioner[];
  practionerRole: PractitionerLocationRole[];
}

export default {
  namespaced: true,
  state: {
    practitioners: [],
    practionerRole: [],
  },
  mutations: {
    setPractitioners(state, practitioners: IPractitioner[]) {
      state.practitioners = practitioners;
    },
    updatePractitioners(state, practitioners: IPractitioner[]) {
      const practitionerSet = new ObjectSet(
        [...state.practitioners, ...practitioners],
        "id"
      );
      state.practitioners = [...practitionerSet];
    },
    deletePractitioner(state, id: string) {
      const index = state.practitioners.findIndex(
        practitioner => practitioner.id == id
      );
      if (index < 0) return;
      const practitioners = [...state.practitioners];
      practitioners.splice(index, 1);
      state.practitioners = [...practitioners];
    },
    deleteLocationrole(state, id: string) {
      const index = state.practionerRole.findIndex(
        practitioner => practitioner.id == id
      );
      if (index < 0) return;
      const dirset = [...state.practionerRole];
      dirset.splice(index, 1);
      state.practionerRole = [...dirset];
    },
  },
  actions: {
    async fetchPractitioners(ctx) {
      const practitioners = await fetchPractitioners();
      ctx.commit("setPractitioners", practitioners);
    },
    async getPractitionerById(ctx, id: string) {
      // return ctx.state.practitioners.find(
      //   practitioner => practitioner.id == id
      // );
      const r = await getPractitioner(id);
      console.log("r", r.data);
      return r.data;
    },
    async deletePractitioner(ctx, id: string) {
      const deleted = await deletePractitioner(id);
      if (deleted) ctx.commit("deletePractitioner", id);
      return deleted;
    },
    async deleteLocationrole(ctx, { id, roleId }: any) {
      if (!id) return;
      const deleted = await deleteLocationrole(id, roleId);
      if (!deleted) return false;
      ctx.commit("deleteLocationrole", id, roleId);
      return true;
    },
    async searchPractitioners(ctx, query: string) {
      if (!ctx.state.practitioners.length)
        await ctx.dispatch("fetchPractitioners");
      const practitioners = ctx.state.practitioners;
      return search.searchObjectArray(practitioners, query);
    },
    async getPractitionerRoleById(ctx, id: string) {
      if (ctx.state.practionerRole.length < 1)
        await ctx.dispatch("fetchPractitioners");
      return ctx.state.practionerRole.find(
        practitioner => practitioner.id == id
      );
    },
  },
} as StoreOptions<PractitionerState>;
