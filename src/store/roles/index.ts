// import ObjectSet from "@/lib/objectset";
// import ICareteam from "@/types/ICareteam";
import { StoreOptions } from "vuex";
import { getPractitioner, deleteCareteam} from "./helper";

export default {
  namespaced: true,
  state: {
    careteams: [],
  },
  mutations: {
    setCareteams(state, careteams) {
        console.log(careteams, "care");
        
      if (careteams.id) state.careteams = [...careteams];
    },
  },

  actions: {
    async getPractitioner(ctx) {
      const careteams = await getPractitioner();
      ctx.commit("setCareteams", careteams);
    },
    async getCareteamById(ctx, id: string) {
      if (ctx.state.careteams.length < 1) await ctx.dispatch("fetchCareteams");
      return ctx.state.careteams.find((careteam: any) => careteam.id == id);
    },
    async deleteCareteam(ctx, id: string) {
      const deleted = await deleteCareteam(id);
      if (!deleted) return false;
      ctx.commit("deleteCareteam", id);
      return true;
    },
  },
} as StoreOptions<any>
