import ICarePartner from "@/types/ICarePartner";
import { StoreOptions } from "vuex";
import CarePartnersClient from "./helper";

interface CarePartnersStore {
    carePartners: ICarePartner[]
}
export default <StoreOptions<CarePartnersStore>> {
    namespaced: true,
    state: {
        carePartners: []
    },

    mutations: {
        add(state, partner: ICarePartner) {
            state.carePartners.push(partner)
        },

        set(state, partners: ICarePartner[]) {
            state.carePartners = partners
        },

        remove(state, partner: ICarePartner) {
            state.carePartners = state.carePartners.filter(
                (element) => element.identifier != partner.identifier
            )
        }
    },

    actions: {
        async create(context, payload: ICarePartner): Promise<boolean> {
            const partner = await CarePartnersClient.create(payload);
            if(partner.id != null) {
                context.commit("add", partner)
                return true
            }
            return false
        },
        
        async get(context, payload: null): Promise<void> {
            const partners = await CarePartnersClient.get();
            if(partners.length > 0)
                context.commit("set", partners)
        },

        async delete(context, payload: ICarePartner): Promise<boolean> {
            const deleted = await CarePartnersClient.delete(payload.id as string)
            if(deleted)
                context.commit("remove", payload)
            return deleted
        }
    }
}