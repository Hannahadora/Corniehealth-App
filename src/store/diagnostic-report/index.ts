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
          console.log("updateSuccess", r);
          // eslint-disable-next-line no-console
          notify({
            msg: "There was an error fetchings diagnostic reports",
            status: "error",
          });
        });
    },
    async createDReport(ctx: any, data: any) {
      await createReport(data)
        .then(() => {
          notify({
            msg: "Diagnostic report created successfully!!",
            status: "success",
          });
          ctx.dispatch("getAllReports");
        })
        .catch(e => {
          console.log("updateSuccess", e);
          notify({
            msg: "There was an error creating this report",
            status: "error",
          });
        });
    },
    async updateDReport(ctx: any, payload: any) {
      await updateReport(payload)
        // eslint-disable-next-line unused-imports/no-unused-vars
        .then(d => {
          ctx.dispatch("getAllReports");
          notify({
            msg: "Diagnostic report updated successfully!!",
            status: "error",
          });
        })
        .catch(d => {
          // eslint-disable-next-line no-console
          console.log("updateSuccess", d);
          notify({
            msg: "There was an error updating this report",
            status: "error",
          });
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
