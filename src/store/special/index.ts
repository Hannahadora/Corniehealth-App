import ISpecial from "@/types/ISpecial";
import { StoreOptions } from "vuex";
import { deleteSpecial, fetchSpecialNames, fetchSpecials} from "./helper";

interface SpecialState {
    specials:any;
    specialsNames: any;
}

export default {
  namespaced: true,
  state: {
    specials: [],
    specialsNames: [],
  },
  mutations: {
    setSpecials(state, specials: any) {
      state.specials = specials;
    },
    setSpecialNames(state, specialsNames: any) {
      state.specialsNames = [...specialsNames];
    },
    updateSpecials( state, specials: ISpecial) {
      state.specials = specials;
    },

    deleteSpecial(state, id: string) {
      const index = state.specials.findIndex( (special: { id: string; }) => special.id == id);
      if (index < 0) return;
      const specials = state.specials;
      specials.splice(index, 1);
      state.specials = [...specials];
    },
    

 
  },
  actions: {
    async fetchSpecials(ctx) {
      const specials = await fetchSpecials();
      ctx.commit("setSpecials", specials);
    },
    async fetchSpecialNames(ctx) {
      const specials = await fetchSpecialNames();
      ctx.commit("setSpecials", specials);
    },
    async getSpecialById(ctx, id: string) {
      if (ctx.state.specials.length < 1) await ctx.dispatch("fetchSpecials");
      return ctx.state.specials.find((special: { id: string; }) => special.id == id);
    },
    async getSpecialPractitionerById(ctx, id: string) {
      if (ctx.state?.specials?.practitioners?.length < 1) await ctx.dispatch("fetchSpecials");
      return ctx.state?.specials?.practitioners?.find((special: { id: string; }) => special.id == id);
    },
    async getSpecialLocationById(ctx, id: string) {
      if (ctx.state.specials.locations.length < 1) await ctx.dispatch("fetchSpecials");
      return ctx.state.specials.locations?.find((special: { id: string; }) => special.id == id);
    },
    async deleteSpecial(ctx, id: string) {
      const deleted = await deleteSpecial(id);
      if (!deleted) return false;
      ctx.commit("deleteSpecial", id);
      return true;
    },

  },
} as StoreOptions<SpecialState>;
