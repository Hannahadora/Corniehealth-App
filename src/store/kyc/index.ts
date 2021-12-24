import ObjectSet from "@/lib/objectset";
import IKyc from "@/types/IKyc";
import { StoreOptions } from "vuex";
import { fetchKycs } from "./helper";

interface KycState {
  kycs: IKyc[];
}

export default {
    namespaced: true,
    state: {
        kycs: [],
    },
    mutations: {
        setKycs(state, kycs: any) {
            state.kycs = [kycs]
        },
        updateKycs(
            state,
            kycs: IKyc[]
        ) {
            const kycSet = new ObjectSet(
                [...state.kycs, ...kycs],
                "id"
            );
            state.kycs = [...kycSet];
        },
    },
    actions: {
        async fetchKycs(ctx) {
            const kycs = await fetchKycs();
            ctx.commit("setKycs", kycs);
        },
        getKycById(ctx, id: string) {
            return ctx.state.kycs.find(
                kyc => kyc.id == id
            )
        },
    },
} as StoreOptions<KycState>;
