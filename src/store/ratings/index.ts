import IRating  from "@/types/IRating";
import IPageInfo from "@/types/IPageInfo"
import { StoreOptions } from "vuex";
import { fetchRatings, fetchRatingComment, deleteRating, deleteComment } from "./helper";


interface RatingsState {
  ratings: IRating[];
  comments: IRating[];
  pageInfo : IPageInfo;
}

export default {
  namespaced: true,
  state: {
    ratings: [],
    comments: [],
    pageInfo: {},
  },
  mutations: {
    setPageInfo(state, pageInfo){
      state.pageInfo = pageInfo;
    },
    setRatings(state, ratings: any) {
      state.ratings = [...ratings];
    },
    setComments(state, comments: any) {
      state.comments = [...comments];
    },
    deleteRating(state, id: string) {
      const index = state.ratings.findIndex(
        rating => rating.id == id
      );
      if (index < 0) return;
      const ratings = [...state.ratings];
      ratings.splice(index, 1);
      state.ratings = [...ratings];
    },
    deleteComment(state, id: string) {
      const index = state.comments.findIndex(
        comment => comment.id == id
      );
      if (index < 0) return;
      const comments = [...state.comments];
      comments.splice(index, 1);
      state.comments = [...comments];
    },
  },
  actions: {
    async fetchRatingComment(ctx, id: string) {
      const comments = await fetchRatingComment(id);
      ctx.commit("setComments", comments);
    },
    async fetchRatings(ctx, payload? : {page:number, limit:number} ) {
      const { page, limit } = payload ?? {}
      const { data, pageInfo } = await fetchRatings(page ?? 1, limit ?? 10);
      ctx.commit("setRatings", data);
      ctx.commit("setPageInfo", pageInfo);
    },
    async getRatingsById(ctx, id: string) {
      if (ctx.state.ratings.length < 1)
        await ctx.dispatch("fetchRatings");
      return ctx.state.ratings.find(rating => rating.id == id);
    },
    async getCommentsById(ctx, id: string) {
      if (ctx.state.comments.length < 1)
        await ctx.dispatch("fetchRatingComment");
      return ctx.state.comments.find(comment => comment.id == id);
    },
    async deleteRating(ctx, id: string) {
      const deleted = await deleteRating(id);
      if (!deleted) return false;
      ctx.commit("deleteRating", id);
      return true;
    },
    async deleteComment(ctx, id: string) {
      const deleted = await deleteComment(id);
      if (!deleted) return false;
      ctx.commit("deleteComment", id);
      return true;
    },
    async pageSwitch(ctx, page:number){
      const ratings = await fetchRatings();
      ctx.commit("setRatings", ratings);
      ctx.commit("setPageInfo", ratings);
    }
  },
} as StoreOptions<RatingsState>;
