import ObjectSet from "@/lib/objectset";
import ILocation from "@/types/ILocation";
import { StoreOptions } from "vuex";
import { deleteLocation, fetchLocations } from "./helper";

interface LocationState {
  locations: ILocation[];
}

export default {
    namespaced: true,
    state: {
        locations: [],
    },
    mutations: {
        setLocations(state, locations: any) {
            state.locations = [...locations];
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
        async fetchLocations(ctx) {
            const locations = await fetchLocations();

            ctx.commit("setLocations", locations);
        },
        async getLocationById(ctx, id: string) {
            if (ctx.state.locations.length < 1) await ctx.dispatch("fetchLocations");
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
