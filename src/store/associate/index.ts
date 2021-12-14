import ObjectSet from "@/lib/objectset";
import IAssociate from "@/types/IAssociate";
import { StoreOptions } from "vuex";
import { fetchAssociations, deleteAssociation } from "./helper";

interface AssociationState {
  associations: IAssociate[];
}

export default {
    namespaced: true,
    state: {
        associations: [],
    },
    mutations: {
        setAssociations(state, associations: IAssociate[]) {
            state.associations = [...associations];
        },
        updateAssociations(state, associations: IAssociate[]) {
            const associationSet = new ObjectSet(
                [...state.associations, ...associations],
                "id"
            );
            state.associations = [...associationSet];
        },
        deleteAssociation(state, id: string) {
            const index = state.associations.findIndex(
                association => association.id == id
            );
            if (index < 0) return;
            const associations = [...state.associations];
            associations.splice(index, 1);
            state.associations = [...associations];
        },
    },
    actions: {
        async fetchAssociations(ctx, orgId: string) {
            const associations = await fetchAssociations(orgId);
            ctx.commit("setAssociations", associations);
        },
        async getAssociationById(ctx, id: string) {
            if (ctx.state.associations.length < 1)
                await ctx.dispatch("fetchAssociations");
            return ctx.state.associations.find(association => association.id == id);
        },
        async deleteAssociation(ctx, id: string) {
            const deleted = await deleteAssociation(id);
            if (!deleted) return false;
            ctx.commit("deleteAssociation", id);
            return true;
        },
    },
} as StoreOptions<AssociationState>;
