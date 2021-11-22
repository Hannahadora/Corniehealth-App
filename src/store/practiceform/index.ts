import ObjectSet from "@/lib/objectset";
import IPracticeform from "@/types/IPracticeform";
import { StoreOptions } from "vuex";
import {
  deletePracticeform,
  fetchPracticeforms,
  fetchPracticeformsQuestions,
  fetchPracticeformsTemplates,
  fetchPracticeformsQuestionnaires,
} from "./helper";

interface PracticeformState {
  practiceforms: IPracticeform[];
  practiceformsQuestionnaries: IPracticeform[];
  practiceformstemplates: IPracticeform[];
  practiceformsquestions: IPracticeform[];
}

export default {
  namespaced: true,
  state: {
    practiceforms: [],
    practiceformsquestions: [],
    practiceformstemplates: [],
    practiceformsQuestionnaries:[],
  },
  mutations: {
    setPracticeforms(state, practiceforms: IPracticeform[]) {
      state.practiceforms = [...practiceforms];
    },
    setPracticeformsQuestionnaires(state, practiceformsQuestionnaries: IPracticeform[]) {
      state.practiceformsQuestionnaries = [...practiceformsQuestionnaries];
    },
    setPracticeformsQuestions(state, practiceformsquestions: IPracticeform[]) {
      state.practiceformsquestions = [...practiceformsquestions];
    },
    setPracticeformsTemplates(state, practiceformstemplates: IPracticeform[]) {
      state.practiceformstemplates = [...practiceformstemplates];
    },
    updatePracticeforms(state, practiceforms: IPracticeform[]) {
      const practiceformSet = new ObjectSet(
        [...state.practiceforms, ...practiceforms],
        "id"
      );
      state.practiceforms = [...practiceformSet];
    },
    deletePracticeform(state, id: string) {
      const index = state.practiceforms.findIndex(
        (practiceform) => practiceform.id == id
      );
      if (index < 0) return;
      const practiceforms = [...state.practiceforms];
      practiceforms.splice(index, 1);
      state.practiceforms = [...practiceforms];
    },
  },
  actions: {
    async fetchPracticeforms(ctx) {
      const practiceforms = await fetchPracticeforms();
      ctx.commit("setPracticeforms", practiceforms);
    },
    async fetchPracticeformsQuestionnaires(ctx) {
      const practiceformsQuestionnaries = await fetchPracticeformsQuestionnaires();
      ctx.commit("setPracticeformsQuestionnaires", practiceformsQuestionnaries);
    },
    async fetchPracticeformsQuestions(ctx) {
      const practiceformsquestions = await fetchPracticeformsQuestions();
      ctx.commit("setPracticeformsQuestions", practiceformsquestions);
    },
    async fetchPracticeformsTemplates(ctx) {
      const practiceformstemplates = await fetchPracticeformsTemplates();
      ctx.commit("setPracticeformsTemplates", practiceformstemplates);
    },
    async getPracticeformById(ctx, id: string) {
      if (ctx.state.practiceforms.length < 1)
        await ctx.dispatch("fetchPracticeforms");
      return ctx.state.practiceforms.find(
        (practiceform) => practiceform.id == id
      );
    },
    async deletePracticeform(ctx, id: string) {
      const deleted = await deletePracticeform(id);
      if (!deleted) return false;
      ctx.commit("deletePracticeform", id);
      return true;
    },
  },
} as StoreOptions<PracticeformState>;
