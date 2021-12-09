import ObjectSet from "@/lib/objectset";
import IPracticeInformation from "@/types/IPracticeInformation";
import IPracticeHour from "@/types/IPracticeHours";
import { StoreOptions } from "vuex";
import { fetchPracticeInformation, fetchPracticeHour } from "./helper";

interface IPracticeInformationState {
  practiceInformation: IPracticeInformation[];
  practiceHour: IPracticeHour[];
}

export default {
  namespaced: true,
  state: {
    practiceInformation: [],
    practiceHour: [],
  },
  mutations: {
    setPracticeInformation(state, practiceInformation: IPracticeInformation[]) {
      state.practiceInformation = [...practiceInformation];
    },
    setPracticeHour(state, practiceHour: IPracticeHour[]) {
      state.practiceHour = [...practiceHour];
    },
    updatePracticeInformation(
      state,
      practiceInformation: IPracticeInformation[]
    ) {
      const practiceSet = new ObjectSet(
        [...state.practiceInformation, ...practiceInformation],
        "id"
      );
      state.practiceInformation = [...practiceSet];
    },
  },
  actions: {
    async fetchPracticeInformation(ctx) {
      const practiceInformation = await fetchPracticeInformation();
      ctx.commit("setPracticeInformation", practiceInformation);
    },
    async fetchPracticeHour(ctx) {
      const practiceHour = await fetchPracticeHour();
      ctx.commit("setPracticeHour", practiceHour);
    },
    async getPracticeinformationById(ctx, id: string) {
      if (ctx.state.practiceInformation.length < 1)
        await ctx.dispatch("fetchPracticeInformation");
      return ctx.state.practiceInformation.find(
        (practiceInformation) => practiceInformation.id == id
      );
    },
  },
} as StoreOptions<IPracticeInformationState>;
