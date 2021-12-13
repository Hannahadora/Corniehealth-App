import ObjectSet from '@/lib/objectset'
import IAppointment from '@/types/IAppointment'
import { StoreOptions } from 'vuex'
import {
	deleteAppointment,
	fetchAppointments,
	getPatients,
	fetchByIdAppointments,
} from './helper'

interface AppointmentState {
  appointments: IAppointment[];
  patients: any[];
  patientappointments: IAppointment[];
}

export default {
	namespaced: true,
	state: {
		appointments: [],
		patients: [],
		patientappointments: [],
	},
	mutations: {
		setAppointments(state, appointments: any) {
			state.appointments = [...appointments.result]
		},
		setPatientAppointment(state, appointments: any) {
			state.patientappointments = [...appointments.result]
		},

		setPatients(state, pts) {
			if (pts && pts.length > 0) state.patients = [...pts]
		},
		updateAppointments(state, appointments: IAppointment[]) {
			const appointmentSet = new ObjectSet(
				[...state.appointments, ...appointments],
				'id'
			)
			state.appointments = [...appointmentSet]
		},
		deleteAppointment(state, id: string) {
			const index = state.appointments.findIndex(
				(appointment) => appointment.id == id
			)
			if (index < 0) return
			const appointments = [...state.appointments]
			appointments.splice(index, 1)
			state.appointments = [...appointments]
		},
	},
	actions: {
		async fetchByIdAppointments(ctx, patientId: string) {
			const appointments = await fetchByIdAppointments(patientId)
			ctx.commit('setPatientAppointment', appointments)
		},
		async fetchAppointments(ctx) {
			const appointments = await fetchAppointments()
			ctx.commit('setAppointments', appointments)
		},
		async getPatients(ctx) {
			const pts = await getPatients()
			ctx.commit('setPatients', pts)
		},
		async getAppointmentById(ctx, id: string) {
			if (ctx.state.appointments.length < 1)
				await ctx.dispatch('fetchAppointments')
			return ctx.state.appointments.find((appointment) => appointment.id == id)
		},
		async getAppointmentResponseById(ctx, id: string) {
			if (ctx.state.appointments.length < 1)
				await ctx.dispatch('fetchAppointments')
			return ctx.state.appointments.find((appointment) => appointment.id == id)
		},
		async deleteAppointment(ctx, id: string) {
			const deleted = await deleteAppointment(id)
			if (!deleted) return false
			ctx.commit('deleteAppointment', id)
			return true
		},
	},
} as StoreOptions<AppointmentState>
