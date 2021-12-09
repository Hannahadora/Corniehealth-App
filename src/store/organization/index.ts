import { IOrganization } from '@/types/IOrganization'
import { StoreOptions } from 'vuex'
import { fetchOrganization } from './helper'

interface OrganizationState {
  organizationInfo?: IOrganization;
}

export default {
	namespaced: true,
	state: {
		organizationInfo: undefined,
	},
	mutations: {
		setData(state, payload: IOrganization) {
			state.organizationInfo = payload
		},
	},
	actions: {
		async fetchOrgInfo(ctx) {
			const data = await fetchOrganization()
			if (data) ctx.commit('setData', data)
		},
		async getCurrentOrg(ctx) {
			if (ctx.state.organizationInfo) return ctx.state.organizationInfo
			await ctx.dispatch('fetchOrgInfo')
			return ctx.state.organizationInfo
		},
	},
} as StoreOptions<OrganizationState>
