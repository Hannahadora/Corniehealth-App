import ObjectSet from "@/lib/objectset";
import ILocation from "@/types/ILocation";
import { StoreOptions } from "vuex";
import { deleteLocation, fetchLocation, fetchSubLocations } from "./helper";

interface LocationState {
  locations: ILocation[];
}

export default {
  namespaced: true,
  state: {
    locations: [],
    temp: {}
  },
  mutations: {
    setLocations(state, locations: any) {
      if (Array.isArray(locations)) {
        state.locations = [...locations];
      } else {
        state.locations.push(locations);
      }
    },
    updateLocations(state, locations: ILocation[]) {
      const locationSet = new ObjectSet(
        [...state.locations, ...locations],
        "id"
      );
      state.locations = [...locationSet];
    },
    deleteLocation(state, id: string) {
      state.locations = state.locations.filter(location => location.id != id);
    },
  },
  actions: {
    async fetchLocations(ctx, id) {
      const locations = await fetchLocation(id);
      ctx.commit("setLocations", locations);
    },
    async fetchSubLocations(ctx, id) {
      const locations = await fetchSubLocations(id);
      ctx.commit("setLocations", locations);
    },
    async getLocationById(ctx, id: string) {
      await ctx.dispatch("fetchSubLocations", id);
      return ctx.state.locations.find(location => location.id == id);
    },
    async deleteLocation(ctx, id: string) {
      const deleted = await deleteLocation(id);
      if (!deleted) return false;
      ctx.commit("deleteLocation", id);
      return true;
    },
  },
} as StoreOptions<LocationState>;
