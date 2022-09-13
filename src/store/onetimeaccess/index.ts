
import IOnetimeaccess from "@/types/IOnetimeaccess";
import IPatientrecords from "@/types/IPatientrecords";
// import ObjectSet from "@/lib/objectset";
import { StoreOptions } from "vuex";
import {fetchOnetimeaccess, fetchOnetimeaccessComments, fetchOnetimeaccessHistory, fetchPatientrecords} from "./helper";

interface MarkupState {
  onetimeaccesses: IOnetimeaccess[];
  onetimeacesshistory: IOnetimeaccess[];
  onetimeaccesscomments: IOnetimeaccess[];
  patienthealthrecords: IPatientrecords[]
}

export default {
  namespaced: true,
  state: {
    onetimeaccesses: [],
    onetimeacesshistory: [],
    onetimeaccesscomments: [],
    patienthealthrecords: [],
  },
  mutations: {
    setOnetimeaccess(state, onetimeaccesses: IOnetimeaccess[]) {
      state.onetimeaccesses = [...onetimeaccesses];
    },
    setPatienthealthrecords(state, patienthealthrecords: IPatientrecords[]) {
      state.patienthealthrecords = [...patienthealthrecords];
    },
    setOnetimeaccessHistory(state, onetimeacesshistory: any) {
      state.onetimeacesshistory = onetimeacesshistory;
    },
    setOnetimeaccessComments(state, onetimeaccesscomments: any) {
      state.onetimeaccesscomments = onetimeaccesscomments;
    },

  },
  actions: {
    async fetchPatientrecords(ctx) {
      const patienthealthrecords = await fetchPatientrecords();
      ctx.commit("setPatienthealthrecords", patienthealthrecords);
    },
    async fetchOnetimeaccess(ctx) {
      const onetimeaccesses = await fetchOnetimeaccess();
      ctx.commit("setOnetimeaccess", onetimeaccesses);
    },
    async fetchOnetimeaccessHistory(ctx, accessId: string) {
      const onetimeacesshistory = await fetchOnetimeaccessHistory(accessId);
      ctx.commit("setOnetimeaccessHistory", onetimeacesshistory);
    },
    async fetchOnetimeaccessComments(ctx, accessId: string) {
      const onetimeaccesscomments = await fetchOnetimeaccessComments(accessId);
      ctx.commit("setOnetimeaccessComments", onetimeaccesscomments);
    },
  },
} as StoreOptions<MarkupState>;
