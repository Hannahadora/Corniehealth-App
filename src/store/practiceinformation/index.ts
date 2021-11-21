import ObjectSet from "@/lib/objectset";
import IPracticeInformation from "@/types/IPracticeInformation";
import IPracticeHour from "@/types/IPracticeHours";
import { StoreOptions } from "vuex";
import { fetchPracticeInformation, fetchPracticeHour } from "./helper";

interface IPracticeInformationState {
  practiceInformation: IPracticeInformation[],
  practiceHour: IPracticeHour[],
}

// interface IPracticeHourState {
//   // practiceInformation: IPracticeInformation[],
//   practiceHour: IPracticeHour[],
// }


export default {
  namespaced: true,
  state: {
    practiceInformation: [],
    practiceHour:[],
  },
  mutations: {
    setPracticeInformation(state, practiceInformation: IPracticeInformation[]) {
      state.practiceInformation = [...practiceInformation];
    },
    setPracticeHour(state, practiceHour: IPracticeHour[]) {
      state.practiceHour = [...practiceHour];
    },
    updatePracticeInformation(state, practiceInformation: IPracticeInformation[]) {
      const practiceSet = new ObjectSet([...state.practiceInformation, ...practiceInformation], "id");
      state.practiceInformation = [...practiceSet];
    },
    // deleteImpression(state, id: string) {
    //   const index = state.impressions.findIndex((impression) => impression.id == id);
    //   if (index < 0) return;
    //   const impressions = [...state.impressions];
    //   impressions.splice(index, 1);
    //   state.impressions = [...impressions];
    // },
  },
  actions: {
    async fetchPracticeInformation(ctx) {
      const practiceInformation = await fetchPracticeInformation();
      ctx.commit("setPracticeInformation", practiceInformation);
    },
    async fetchPracticeHour(ctx) {
      alert("hour");
      const practiceHour = await fetchPracticeHour();
      ctx.commit("setPracticeHour", practiceHour);
    },
    async getPracticeinformationById(ctx, id: string) {
      if (ctx.state.practiceInformation.length < 1) await ctx.dispatch("fetchPracticeInformation");
      return ctx.state.practiceInformation.find((practiceInformation) => practiceInformation.id == id);
    },
    
    // async deleteImpression(ctx, id: string) {
    //   const deleted = await deleteImpression(id);
    //   if (!deleted) return false;
    //   ctx.commit("deleteImpression", id);
    //   return true;
    // },
  },
} as StoreOptions<IPracticeInformationState>;
