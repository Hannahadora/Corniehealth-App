import ObjectSet from '@/lib/objectset'
import ICareteam from '@/types/ICareteam'
import { StoreOptions } from 'vuex'
import { fetchCareteams, deleteCareteam } from './helper'

interface CareteamState {
  careteams: ICareteam[];
}

export default {
	namespaced: true,
	state: {
		careteams: [],
	},
	mutations: {
		setCareteams(state, careteams: ICareteam[]) {
			state.careteams = [...careteams]
		},
		updateCareteams(state, careteams: ICareteam[]) {
			const careteamSet = new ObjectSet(
				[...state.careteams, ...careteams],
				'id'
			)
			state.careteams = [...careteamSet]
		},
		deleteCareteam(state, id: string) {
			const index = state.careteams.findIndex((careteam) => careteam.id == id)
			if (index < 0) return
			const careteams = [...state.careteams]
			careteams.splice(index, 1)
			state.careteams = [...careteams]
		},
	},
	actions: {
		async fetchCareteams(ctx) {
			const careteams = await fetchCareteams()
			ctx.commit('setCareteams', careteams)
		},
		async getCareteamById(ctx, id: string) {
			if (ctx.state.careteams.length < 1) await ctx.dispatch('fetchCareteams')
			return ctx.state.careteams.find((careteam) => careteam.id == id)
		},
		async deleteCareteam(ctx, id: string) {
			const deleted = await deleteCareteam(id)
			if (!deleted) return false
			ctx.commit('deleteCareteam', id)
			return true
		},
	},
} as StoreOptions<CareteamState>
