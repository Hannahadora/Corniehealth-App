import ICollectionCenters from "@/types/ICollectionCenters";
import { StoreOptions } from "vuex";
import {  fetchCollectionCenters } from "./helper";

interface ICollectionCentersState {
    collectioncenters: ICollectionCenters[];
}

export default {
  namespaced: true,
  state: {
    collectioncenters: [],
  },
  mutations: {
    setCollectionCenter(state, collectioncenters: any) {
      state.collectioncenters = [collectioncenters];
    },
 
  },
  actions: {
    async fetchCollectionCenters(ctx) {
      const collectioncenters = await fetchCollectionCenters();
      ctx.commit("setCollectionCenter", collectioncenters);
    },
    getCollecitoncenterById(ctx, id: string) {
      return ctx.state.collectioncenters.find(
        collectioncenter => collectioncenter.id == id
      );
    },

  
  },
} as StoreOptions<ICollectionCentersState>;
