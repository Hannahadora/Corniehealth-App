import IAppointmentTypes from "@/types/IAppointmentTypes";
import { StoreOptions } from "vuex";
import { getappointmentTypes } from "./helper";

interface AppointmentTypes {
  appointments: IAppointmentTypes[],
}

export default {
  namespaced: true,
  state: {
    appointments: [],
  },

  mutations: {

    setPatientPlans(state, items) {
      if (items && items.length > 0) state.appointments = [ ...items ];
    },
  },

  actions: {
    async getappointmentTypes(ctx) {
      const response = await getappointmentTypes();
      ctx.commit("setPatientPlans", response);
    },

  },
} as StoreOptions<AppointmentTypes>
