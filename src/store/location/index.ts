import ObjectSet from "@/lib/objectset";
import ILocation from "@/types/ILocation";
import { StoreOptions } from "vuex";
import { fetchLocations } from "./helper";

interface LocationState {
  locations: ILocation[];
}

export default {
  namespaced: true,
  state: {
    locations: [],
  },
  mutations: {
    setLocations(state, locations: ILocation[]) {
      state.locations = [...locations];
    },
    updateLocations(state, locations: ILocation[]) {
      const locationSet = new ObjectSet(
        [...state.locations, ...locations],
        "id"
      );
      state.locations = [...locationSet];
    },
  },
  actions: {
    async fetchLocations(ctx) {
      const locations = await fetchLocations();
      ctx.commit("setLocations", locations);
    },
    getLocationById(ctx, id: string) {
      return ctx.state.locations.find((location) => location.id == id);
    },
  },
} as StoreOptions<LocationState>;
