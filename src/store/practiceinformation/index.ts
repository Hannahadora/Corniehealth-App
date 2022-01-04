import ObjectSet from "@/lib/objectset";
import IPracticeInformation from "@/types/IPracticeInformation";
import IPracticeHour from "@/types/IPracticeHours";
import { StoreOptions } from "vuex";
import { fetchPracticeInformations, fetchPracticeHours } from "./helper";

interface IPracticeInformationState {
  practiceInformations: IPracticeInformation[];
  practiceHours: IPracticeHour[];
}

export default {
  namespaced: true,
  state: {
    practiceInformations: [],
    practiceHours: [],
  },
  mutations: {
    setPracticeInformations(state, practiceInformations: any) {
      state.practiceInformations = [practiceInformations]
    },
    setPracticeHours(state, practiceHours: any) {
      state.practiceHours = [practiceHours]
    },
    updatePracticeInformations(
      state,
      practiceInformations: IPracticeInformation[]
    ) {
      const practiceInformationSet = new ObjectSet(
        [...state.practiceInformations, ...practiceInformations],
        "id"
      );
      state.practiceInformations = [...practiceInformationSet];
    },
    updatePracticeHours(state, practiceHours: IPracticeHour[]) {
      const practiceHourSet = new ObjectSet(
        [...state.practiceHours, ...practiceHours],
        "id"
      );
      state.practiceHours = [...practiceHourSet];
    },
  },
  actions: {
    async fetchPracticeInformations(ctx) {
      const practiceInformations = await fetchPracticeInformations();
      ctx.commit("setPracticeInformations", practiceInformations);
    },
    async fetchPracticeHours(ctx) {
      const practiceHours = await fetchPracticeHours();
      ctx.commit("setPracticeHours", practiceHours);
    },
    getPracticeinformationById(ctx, id: string) {
      return ctx.state.practiceInformations.find(
        practiceInformation => practiceInformation.id == id
      )
    },
    getPracticeHourById(ctx, id: string) {
      return ctx.state.practiceHours.find(
        practiceHour => practiceHour.id == id
      )
    },
  },
} as StoreOptions<IPracticeInformationState>;
