import { StoreOptions } from "vuex";
import  ISpecialistrefferal  from "@/types/ISpecialistrefferal";
// import ObjectSet from "@/lib/objectset";
import { fetchSpecialistRefferal } from "./helper";

interface SpecialistRefferalStore {
  specialistrefferals: ISpecialistrefferal[];

}

export default {
  namespaced: true,
  state: {
    specialistrefferals: [],

  },
  mutations: {
    setSpecialistRefferal(state, specialistrefferals: ISpecialistrefferal[]) {
      // const patientvisitSet = new ObjectSet([...state.patientvisits, ...patientvisits], "id");
      // state.patientvisits = [...patientvisitSet];
      state.specialistrefferals = specialistrefferals;
    },
  },

  actions: {
    async fetchSpecialistRefferal(ctx) {
      const specialistrefferals = await fetchSpecialistRefferal();
      ctx.commit("setSpecialistRefferal", specialistrefferals);
    },

    getSpecialistRefferalById(ctx, id: string) {
      return ctx.state.specialistrefferals.find(
        specialistrefferal => specialistrefferal.id == id
      );
    },

  },
} as StoreOptions<SpecialistRefferalStore>;
