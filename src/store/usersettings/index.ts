import { StoreOptions } from 'vuex'
import {
	setUserUp,
	getDormains,
	changePassword,
	postSignature,
} from './helper'

interface UserSetup {
  practitioner: any;
  domains: any[];
}

export default {
	namespaced: true,
	state: {
		practitioner: {},
		domains: [],
	},

	mutations: {
		setDomains(state, domains) {
			if (domains) state.domains = [...domains]
		},
	},

	actions: {
		async getDomains(ctx) {
			const domains = await getDormains()
			ctx.commit('setDomains', domains)
		},

		async changePassword(ctx, body: any) {
			const res = await changePassword(body)
			if (!res) return false
			return true
		},

		async setUserUp(ctx, body: any) {
			const setup = await setUserUp(body)
			if (!setup) return false
			// ctx.commit("removeRole", id);
			return true
		},

		async postSignature(ctx, body: any) {
			const signature = await postSignature(body)
			if (!signature) return false
			// ctx.commit("removeRole", id);
			return true
		},
	},
} as StoreOptions<UserSetup>
