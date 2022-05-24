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
          // eslint-disable-next-line no-console
          console.log("getRe", r);
        });
    },
    async createDReport(ctx: any, data: any) {
      await createReport(data)
        .then(() => {
          ctx.dispatch("getAllReports");
        })
        .catch(e => {
          // eslint-disable-next-line no-console
          console.log("createR", e);
        });
    },
    async updateDReport(ctx: any, payload: any) {
      await updateReport(payload)
        // eslint-disable-next-line unused-imports/no-unused-vars
        .then(d => {
          ctx.dispatch("getAllReports");
        })
        .catch(d => {
          // eslint-disable-next-line no-console
          console.log("updateR", d);
        });
    },
    async updateRStatus(ctx: any, payload: any) {
      await updateReportStatus(payload)
        .then(e => {
          // eslint-disable-next-line no-console
          console.log("updateSuccess", e);
        })
        .catch(f => {
          // eslint-disable-next-line no-console
          console.log("ds", f);
        });
    },
    async deleteDReport(ctx: any, payload: any) {
      await deleteReport(payload)
        .then(() => {
          ctx.dispatch("getAllReports");
        })
        .catch(e => {
          // eslint-disable-next-line no-console
          console.log("deleteReport", e);
        });
    },
  },
};
