
import IMarkup from "@/types/IMarkup";
import { StoreOptions } from "vuex";
import {fetchMarkups} from "./helper";

interface MarkupState {
  markups: IMarkup[];
}

export default {
  namespaced: true,
  state: {
    markups: [],
  },
  mutations: {

    setMarkups(state, markups: IMarkup[]) {
      state.markups = [...markups];
    },

  },
  actions: {
    async fetchMarkups(ctx, practitionerId: string) {
      const markups = await fetchMarkups(practitionerId);
      ctx.commit("setMarkups", markups);
    },
  },
} as StoreOptions<MarkupState>;
