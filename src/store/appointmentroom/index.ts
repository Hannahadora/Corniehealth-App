import ObjectSet from "@/lib/objectset";
import IAppointmentRoom from "@/types/IAppointmentRoom";
import { StoreOptions } from "vuex";
import { deleteAppointmentroom, fetchAppointmentrooms, fetchByIdAppointmentsRooms } from "./helper";
import IPageInfo from "@/types/IPageInfo";

interface AppointmentRoomState {
  appointmentrooms: IAppointmentRoom[];
  practitioners: any[];
  pageInfo : IPageInfo;
}

export default {
  namespaced: true,
  state: {
    appointmentrooms: [],
    practitioners: [],
    pageInfo: {},
  },
  mutations: {
    setPageInfo(state, pageInfo){
      state.pageInfo = pageInfo;
    },
    getPatientAppointmentRooms(state, appointmentrooms: any) {
      state.appointmentrooms = [...appointmentrooms];
    },
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
        room => room.locationId == currentLocation
      );
    },
  },
  actions: {
    async fetchByIdAppointmentsRooms(ctx, locationId: string) {
      const appointmentrooms = await fetchByIdAppointmentsRooms(locationId);
      ctx.commit("getPatientAppointmentRooms", appointmentrooms);
    },
    async fetchAppointmentrooms(ctx,  payload? : {page:number, limit:number}) {
      const { page, limit } = payload ?? {}
      const { data, pageInfo } = await fetchAppointmentrooms(page ?? 1, limit ?? 10);
      ctx.commit("setAppointmentrooms", data);
      ctx.commit("setPageInfo", pageInfo);
    },
    async addAppointmentRoom(ctx, appointmentroom: IAppointmentRoom) {
      ctx.commit("addAppointmentRoom", appointmentroom);
    },
    async getAppointmentRoomById(ctx, id: string) {
      if (ctx.state.appointmentrooms.length < 1)
        await ctx.dispatch("fetchAppointmentrooms");
      return ctx.state.appointmentrooms.find(
        appointmentroom => appointmentroom.id == id
      );
    },
    async deleteAppointmentroom(ctx, id: string) {
      const removed = await deleteAppointmentroom(id);
      if (removed) ctx.commit("deleteAppointmentroom", id);
    },
    async pageSwitch(ctx, page:number){
      const appointmentrooms = await fetchAppointmentrooms();
      ctx.commit("setAppointmentrooms", appointmentrooms);
      ctx.commit("setPageInfo", appointmentrooms);
    }
  },
} as StoreOptions<AppointmentRoomState>;
