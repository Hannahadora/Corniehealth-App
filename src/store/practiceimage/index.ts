import IPracticeImage from "@/types/IPracticeImage";
import { StoreOptions } from "vuex";
import { deletePracticeImage, fetchpracticeImages } from "./helper";

interface IPracticeImageState {
  practiceimages: IPracticeImage[];
}

export default {
  namespaced: true,
  state: {
    practiceimages: [],
  },
  mutations: {
    setPracticeImages(state, practiceimages: any) {
      state.practiceimages = [practiceimages];
    },
    deletePracticeImage(state, id: string) {
      const index = state.practiceimages.findIndex(practiceimage => practiceimage.id == id);
      if (index < 0) return;
      const practiceimages = [...state.practiceimages];
      practiceimages.splice(index, 1);
      state.practiceimages = [...practiceimages];
    },
 
  },
  actions: {
    async fetchpracticeImages(ctx) {
      const practiceimages = await fetchpracticeImages();
      ctx.commit("setPracticeImages", practiceimages);
    },
    getPracticeimageById(ctx, id: string) {
      return ctx.state.practiceimages.find(
        practiceimage => practiceimage.id == id
      );
    },
    async deletePracticeImage(ctx, id: string) {
      const deleted = await deletePracticeImage(id);
      if (!deleted) return false;
      ctx.commit("deletePracticeImage", id);
      return true;
    },
  
  },
} as StoreOptions<IPracticeImageState>;
