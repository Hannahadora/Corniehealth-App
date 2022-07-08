import IPrefrence from "@/types/IPrefrence";
import { StoreOptions } from "vuex";
import {  fetchPreferences  } from "./helper";

interface IPreferenceState {
  preferences: IPrefrence[];
}

export default {
  namespaced: true,
  state: {
    preferences: [],
  },
  mutations: {
    setPreferences(state, preferences: any) {
      state.preferences = [preferences];
    },

  },
  actions: {
    async fetchPreferences(ctx) {
      const preferences = await fetchPreferences();
      ctx.commit("setPreferences", preferences);
    },
    getPrefrenceById(ctx, id: string) {
      return ctx.state.preferences.find(
        preference => preference.id == id
      );
    },

  },
} as StoreOptions<IPreferenceState>;
