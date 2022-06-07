import ObjectSet from "@/lib/objectset";
import IAppointmentRoom from "@/types/IAppointmentRoom";
import { StoreOptions } from "vuex";
import { deleteAppointmentroom, fetchAppointmentrooms } from "./helper";

interface AppointmentRoomState {
  appointmentrooms: IAppointmentRoom[];
  practitioners: any[];
}

export default {
  namespaced: true,
  state: {
    appointmentrooms: [],
    practitioners: [],
  },
  mutations: {
    setAppointmentrooms(state, appointmentrooms: IAppointmentRoom[]) {
      state.appointmentrooms = [...appointmentrooms];
    },
    addAppointmentRoom(state, appointmentroom: IAppointmentRoom) {
      state.appointmentrooms.unshift(appointmentroom);
    },
    updateAppointmentRooms(state, appointmentrooms: IAppointmentRoom[]) {
      const appointmentRoomSet = new ObjectSet(
        [...state.appointmentrooms, ...appointmentrooms],
        "id"
      );
      state.appointmentrooms = [...appointmentRoomSet];
    },
    deleteAppointmentroom(state, id: string) {
      const index = state.appointmentrooms.findIndex(
        (appointmentroom: any) => appointmentroom.id == id
      );
      if (index < 0) return;
      const appointmentrooms = [...state.appointmentrooms];
      appointmentrooms.splice(index, 1);
      state.appointmentrooms = [...appointmentrooms];
    },
  },
  getters: {
    locationRooms({ appointmentrooms }, getters, rootState, rootGetters) {
      const currentLocation = rootGetters["user/authCurrentLocation"];
      return appointmentrooms.filter(
        (room) => room.locationId == currentLocation
      );
    },
  },
  actions: {
    async fetchAppointmentrooms(ctx) {
      const appointmentrooms = await fetchAppointmentrooms();
      ctx.commit("setAppointmentrooms", appointmentrooms);
    },
    async addAppointmentRoom(ctx, appointmentroom: IAppointmentRoom) {
      ctx.commit("addAppointmentRoom", appointmentroom);
    },
    async getAppointmentRoomById(ctx, id: string) {
      if (ctx.state.appointmentrooms.length < 1)
        await ctx.dispatch("fetchAppointmentrooms");
      return ctx.state.appointmentrooms.find(
        (appointmentroom) => appointmentroom.id == id
      );
    },
    async deleteAppointmentroom(ctx, id: string) {
      const removed = await deleteAppointmentroom(id);
      if (removed) ctx.commit("deleteAppointmentroom", id);
    },
  },
} as StoreOptions<AppointmentRoomState>;
