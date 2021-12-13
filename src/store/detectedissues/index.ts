import ObjectSet from "@/lib/objectset";
import IIssues from "@/types/IIssues";
import { StoreOptions } from "vuex";
import { fetchIssues } from "./helper";

interface IssuesState {
  issues: IIssues[];
}

export default {
  namespaced: true,
  state: {
    issues: [],
  },
  mutations: {
    setIssues(state, issues: IIssues[]) {
      state.issues = [...issues];
    },
    updateIssues(state, issues: IIssues[]) {
      const issueSet = new ObjectSet([...state.issues, ...issues], "id");
      state.issues = [...issueSet];
    },
  },
  actions: {
    async fetchIssues(ctx, patientId: string) {
      const issues = await fetchIssues();
      ctx.commit("setIssues", issues);
    },
    async getIssuesById(ctx, id: string) {
      if (ctx.state.issues.length < 1) await ctx.dispatch("fetchIssues");
      return ctx.state.issues.find((issues) => issues.id == id);
    },
  },
} as StoreOptions<IssuesState>;
