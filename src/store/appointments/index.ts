import ObjectSet from "@/lib/objectset"
import IAppointmentTypes from "@/types/IAppointmentTypes"
import { StoreOptions } from "vuex"
import { deleteAppointmentType, fetchappointmentTypes } from "./helper"

interface AppointmentTypeState {
  appointmentTypes: IAppointmentTypes[];
}

export default {
    namespaced: true,
    state: {
        appointmentTypes: [],
    },
    mutations: {
        setAppointmentTypes(state, appointmentTypes: IAppointmentTypes[]) {
            state.appointmentTypes = [...appointmentTypes]
        },
        updateAppointmentTypes(state, appointmentTypes: IAppointmentTypes[]) {
            const appointmentTypeSet = new ObjectSet([...state.appointmentTypes, ...appointmentTypes], "id")
            state.appointmentTypes = [...appointmentTypeSet]
        },
        deleteAppointmentType(state, id: string) {
            const index = state.appointmentTypes.findIndex(appointmentType => appointmentType.id == id)
            if (index < 0) return
            const appointmentTypes = [...state.appointmentTypes]
            appointmentTypes.splice(index, 1)
            state.appointmentTypes = [...appointmentTypes]
        },
    },
    actions: {
        async fetchappointmentTypes(ctx) {
            const appointmentTypes = await fetchappointmentTypes()
            ctx.commit("setAppointmentTypes", appointmentTypes)
        },
        async getAppointmentTypeById(ctx, id: string) {
            if (ctx.state.appointmentTypes.length < 1) await ctx.dispatch("fetchappointmentTypes")
            return ctx.state.appointmentTypes.find(appointmentType => appointmentType.id == id)
        },
        async deleteAppointmentType(ctx, id: string) {
            const deleted = await deleteAppointmentType(id)
            if (!deleted) return false
            ctx.commit("deleteAppointmentType", id)
            return true
        },
    },
} as StoreOptions<AppointmentTypeState>
