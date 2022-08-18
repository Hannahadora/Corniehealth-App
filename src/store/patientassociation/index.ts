import ObjectSet from "@/lib/objectset";
import {IPatientAssociation} from "@/types/IPatientAssociation";
import { StoreOptions } from "vuex";
import { fetchFamilyAssociations, fetchFamilyMember, deleteFamilyMember} from "./helper";

interface FamilyAssociationState {
    familyassociations: IPatientAssociation[];
    familymembers: IPatientAssociation[];
}

export default {
  namespaced: true,
  state: {
    familyassociations: [],
    familymembers: [],
  },
  mutations: {
    setFamilyAssociation(state, familyassociations: any) {
      state.familyassociations = [...familyassociations];
    },
    setFamilyMember(state, familymembers: any) {
      state.familymembers = [...familymembers];
    },
    updateFamilyAssociaton(state, familyassociations: IPatientAssociation[]) {
      const familyassociatonSet = new ObjectSet([...state.familyassociations, ...familyassociations], "id");
      state.familyassociations = [...familyassociatonSet];
    },
    updateFamilyMember(state, familymembers: IPatientAssociation[]) {
      const familymemberSet = new ObjectSet([...state.familymembers, ...familymembers], "id");
      state.familymembers = [...familymemberSet];
    },
    deleteFamilyMember(state, id: string) {
      const index = state.familymembers.findIndex(
        familymember => familymember.id == id
      );
      if (index < 0) return;
      const familymembers = [...state.familymembers];
      familymembers.splice(index, 1);
      state.familymembers = [...familymembers];
    },
  },
  actions: {
    async fetchFamilyAssociations(ctx) {
      const familyassociations = await fetchFamilyAssociations();
      ctx.commit("setFamilyAssociation", familyassociations);
    },
    async fetchFamilyMember(ctx,familyId :string) {
      const familymembers = await fetchFamilyMember(familyId);
      ctx.commit("setFamilyMember", familymembers);
    },
    async getPatientFamilyAssocaitionById(ctx, id: string) {
      if (ctx.state.familyassociations.length < 1) await ctx.dispatch("fetchFamilyAssociations");
      return ctx.state.familyassociations.find(familyassociation => familyassociation.id == id);
    },
    async getFamilyMemberById(ctx, id: string) {
      if (ctx.state.familymembers.length < 1) await ctx.dispatch("fetchFamilyMember");
      return ctx.state.familymembers.find(familymember => familymember.id == id);
    },
    async deleteFamilyMember(ctx, { associateId }: any) {
      if (!associateId) return;
      const deleted = await deleteFamilyMember(associateId);
      if (!deleted) return false;
      ctx.commit("deleteFamilyMember", associateId);
      return true;
    },
  },
} as StoreOptions<FamilyAssociationState>;
