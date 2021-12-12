import ObjectSet from '@/lib/objectset'
import IAllergy from '@/types/IAllergy'
import IAppointmentRoom from '@/types/IAppointmentRoom'
import { StoreOptions } from 'vuex'
import {
	deleteAllergy,
	fetchAllergys,
	getPractitioners,
	fetchAllAllergys,
} from './helper'
import { deleteAppointmentroom, fetchAppointmentrooms } from './helper'

interface AppointmentRoomState {
	appointmentrooms: IAppointmentRoom[];
	allergys: IAllergy[];
	allallergys: IAllergy[];
	practitioners: any[];
}

export default {
	namespaced: true,
	state: {
		appointmentrooms: [],
		allergys: [],
		allallergys: [],
		practitioners: [],
	},
	mutations: {
		setAllAllergys(state, allergys: any) {
			state.allallergys = [...allergys.result]
		},
		setAllergys(state, allergys: IAllergy[]) {
			state.allergys = [...allergys]
		},
		setAppointmentrooms(state, appointmentrooms: IAppointmentRoom[]) {
			state.appointmentrooms = [...appointmentrooms]
		},
		addAppointmentRoom(state, appointmentroom: IAppointmentRoom) {
			state.appointmentrooms.unshift(appointmentroom)
		},
		setPractitioners(state, pts) {
			if (pts && pts.length > 0) state.practitioners = [...pts]
		},
		updateAllergys(state, allergys: IAllergy[]) {
			const allergySet = new ObjectSet([...state.allergys, ...allergys], 'id')
			state.allergys = [...allergySet]
		},
		deleteAllergy(state, id: string) {
			const index = state.allergys.findIndex(
				(allergy: any) => allergy.id == id
			)
			if (index < 0) return
			const allergys = [...state.allergys]
			allergys.splice(index, 1)
			state.allergys = [...allergys]
		},
		deleteAppointmentroom(state, id: string) {
			const index = state.appointmentrooms.findIndex(
				(appointmentroom: any) => appointmentroom.id == id
			)
			if (index < 0) return
			const appointmentrooms = [...state.appointmentrooms]
			appointmentrooms.splice(index, 1)
			state.appointmentrooms = [...appointmentrooms]
		},
	},
	actions: {
		async fetchAllAllergys(ctx) {
			const allergys = await fetchAllAllergys()
			ctx.commit('setAllAllergys', allergys)
		},
		async fetchAllergys(ctx, patientId: string) {
			const allergys = await fetchAllergys(patientId)
			ctx.commit('setAllergys', allergys)
		},
		async fetchAppointmentrooms(ctx) {
			const appointmentrooms = await fetchAppointmentrooms()

			ctx.commit('setAppointmentrooms', appointmentrooms)
		},
		async addAppointmentRoom(ctx, appointmentroom: IAppointmentRoom) {
			ctx.commit('addAppointmentRoom', appointmentroom)
		},
		async deleteAppointmentroom(ctx, id: string) {
			const removed = await deleteAppointmentroom(id)
			if (removed) ctx.commit('deleteAppointmentroom', id)
		},
		async getPractitioners(ctx) {
			const pts = await getPractitioners()
			ctx.commit('setPractitioners', pts)
		},
		async getAllergyById(ctx, id: string) {
			if (ctx.state.allergys.length < 1) await ctx.dispatch('fetchAllergys')
			return ctx.state.allergys.find((allergy: any) => allergy.id == id)
		},
		async deleteAllergy(ctx, id: string) {
			const deleted = await deleteAllergy(id)
			if (!deleted) return false
			ctx.commit('deleteAllergy', id)
			return true
		},
	},
} as StoreOptions<AppointmentRoomState>
