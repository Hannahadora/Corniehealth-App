import {
  createReport,
  deleteReport,
  getReports,
  updateReport,
  updateReportStatus,
} from "./helper";

export default {
  namespaced: true,
  state: {
    reports: [],
  },
  mutations: {
    setReport(state: { reports: any }, report: never[]) {
      state.reports = report || [];
    },
  },
  actions: {
    async getAllReports(ctx: any) {
      await getReports()
        .then(r => {
          ctx.commit("setReport", r);
        })
        .catch(r => {
          console.log("getRe", r);
        });
    },
    async createDReport(ctx: any, data: any) {
      await createReport(data)
        .then(() => {
          ctx.dispatch("getAllReports");
        })
        .catch(e => {
          console.log("createR", e);
        });
    },
    async updateDReport(ctx: any, payload: any) {
      await updateReport(payload)
        .then(d => {
          ctx.dispatch("getAllReports");
        })
        .catch(d => {
          console.log("updateR", d);
        });
    },
    async updateRStatus(ctx: any, payload: any) {
      await updateReportStatus(payload)
        .then(e => {
          console.log("updateSuccess", e);
        })
        .catch(f => {
          console.log("ds", f);
        });
    },
    async deleteDReport(ctx: any, payload: any) {
      await deleteReport(payload)
        .then(() => {
          ctx.dispatch("getAllReports");
        })
        .catch(e => {
          console.log("deleteReport", e);
        });
    },
  },
};
