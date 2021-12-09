import ObjectSet from "@/lib/objectset";
import IAttachment from "@/types/IAttachment";
import { StoreOptions } from "vuex";
import { fetchAttachment } from "./helper";

interface AttachmentState {
  attachments: IAttachment[];
}

export default {
  namespaced: true,
  state: {
    attachments: [],
  },
  mutations: {
    setAttachment(state, attachments: IAttachment[]) {
      state.attachments = [...attachments];
    },
    updateIssues(state, attachments: IAttachment[]) {
      const attachmentSet = new ObjectSet(
        [...state.attachments, ...attachments],
        "id"
      );
      state.attachments = [...attachmentSet];
    },
    // deleteImpression(state, id: string) {
    //   const index = state.impressions.findIndex((impression) => impression.id == id);
    //   if (index < 0) return;
    //   const impressions = [...state.impressions];
    //   impressions.splice(index, 1);
    //   state.impressions = [...impressions];
    // },
  },
  actions: {
    async fetchAttachment(ctx, patientId: string) {
      const attachments = await fetchAttachment(patientId);
      ctx.commit("setAttachment", attachments);
    },
    async getAttachmentById(ctx, id: string) {
      if (ctx.state.attachments.length < 1)
        await ctx.dispatch("fetchAttachment");
      return ctx.state.attachments.find((attachments) => attachments.id == id);
    },
    // async deleteImpression(ctx, id: string) {
    //   const deleted = await deleteImpression(id);
    //   if (!deleted) return false;
    //   ctx.commit("deleteImpression", id);
    //   return true;
    // },
  },
} as StoreOptions<AttachmentState>;
