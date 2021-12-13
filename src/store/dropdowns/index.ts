import { StoreOptions } from 'vuex'
import { fetchDropdownData } from './helper'

interface DropdownState {
  data: IIndexableObject;
}

export default {
	namespaced: true,
	state: {
		data: {},
	},
	mutations: {
		update(state, payload) {
			state.data = { ...state.data, ...payload }
		},
	},
	actions: {
		async getDropdowns(ctx, name: string) {
			const val = ctx.state.data[name] || (await fetchDropdownData(name))
			ctx.commit('update', { [name]: val })
			return val
		},
	},
} as StoreOptions<DropdownState>
