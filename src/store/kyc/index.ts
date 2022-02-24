import ObjectSet from "@/lib/objectset";
import IKyc from "@/types/IKyc";
import IKycref from "@/types/IKycref";
import IDirector from "@/types/IDirector";
import { StoreOptions } from "vuex";
import { fetchKycs, deleteRefree,deleteDirector, deleteOwner } from "./helper";
import IOwner from "@/types/IOwner";

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
    addDirectors(state, directors: IDirector[]){
      const existingDirs = state.orgKyc.directors || [];
      const dirset = new ObjectSet(
        [...existingDirs, ...directors],
        "id"
      )
      state.orgKyc.directors = [...dirset]
    },
    addOwners(state, owners: IOwner[]){
      const existingDirs = state.orgKyc.beneficialOwners || [];
      const dirset = new ObjectSet(
        [...existingDirs, ...owners],
        "id"
      )
      state.orgKyc.directors = [...dirset]
    },
    updateRefree(state, referees: IKycref[]) {
      const refreeSet = new ObjectSet(
        [...state.orgKyc.referees, ...referees],
        "id"
      );
      state.orgKyc.referees = [...refreeSet];
    },
    updateDirector(state, directors: IDirector[]) {
      const directorSet = new ObjectSet(
        [...state.orgKyc.directors, ...directors],
        "id"
      );
      state.orgKyc.directors = [...directorSet];
    },
    updateOwner(state, owners: IOwner[]) {
      const ownerSet = new ObjectSet(
        [...state.orgKyc.beneficialOwners, ...owners],
        "id"
      );
      state.orgKyc.beneficialOwners = [...ownerSet];
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
    deleteDirector(state, id: string) {
      const index = state.orgKyc.directors.findIndex(
        director => director.id == id
      );
      if (index < 0) return;
      const dirset = [...state.orgKyc.directors];
      dirset.splice(index, 1);
      state.orgKyc.directors = [...dirset];
    },
    deleteOwner(state, id: string) {
      const index = state.orgKyc.beneficialOwners.findIndex(
        owner => owner.id == id
      );
      if (index < 0) return;
      const dirset = [...state.orgKyc.beneficialOwners];
      dirset.splice(index, 1);
      state.orgKyc.beneficialOwners = [...dirset];
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
    async deleteDirector(ctx, id: string) {
      const deleted = await deleteDirector(id);
      if (!deleted) return false;
      ctx.commit("deleteDirector", id);
      return true;
    },
    async deleteOwner(ctx, id: string) {
      const deleted = await deleteOwner(id);
      if (!deleted) return false;
      ctx.commit("deleteOwner", id);
      return true;
    },
    async getRefreeById(ctx, id: string) {
      if (ctx.state.orgKyc.referees.length < 1) await ctx.dispatch("fetchKycs");
      return ctx.state.orgKyc.referees.find(refree => refree.id == id);
    },
    async getDirectorById(ctx, id: string) {
      if (ctx.state.orgKyc.directors.length < 1) await ctx.dispatch("fetchKycs");
      return ctx.state.orgKyc.directors.find(director => director.id == id);
    },
    async getOwnerById(ctx, id: string) {
      if (ctx.state?.orgKyc?.beneficialOwners?.length < 1) await ctx.dispatch("fetchKycs");
      return ctx.state?.orgKyc?.beneficialOwners?.find(owner => owner.id == id);
    },
  },
} as StoreOptions<KycState>;
