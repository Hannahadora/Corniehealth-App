
import IMarkup from "@/types/IMarkup";
import ObjectSet from "@/lib/objectset";
import { StoreOptions } from "vuex";
import {fetchMarkups, fetchMarkupId} from "./helper";

interface MarkupState {
  markups: IMarkup[];
  locationmarkups: IMarkup[];
}

export default {
  namespaced: true,
  state: {
    markups: [],
    locationmarkups: [],
  },
  mutations: {

    setMarkups(state, markups: IMarkup[]) {
      state.markups = [...markups];
    },

    setLocationMarkups(state, markups: IMarkup[]) {
      const requestSet = new ObjectSet([...state.markups, ...markups], "id");
      state.locationmarkups = [...requestSet];
    },
  },
  actions: {
    async fetchLocationMarkups(ctx, locationId: string) {
      const markups = await fetchMarkupId(locationId);
      ctx.commit("setLocationMarkups", markups);
    },
    async fetchMarkups(ctx) {
      const markups = await fetchMarkups();
      ctx.commit("setMarkups", markups);
    },
  },
} as StoreOptions<MarkupState>;
