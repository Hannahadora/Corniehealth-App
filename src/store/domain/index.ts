import ObjectSet from '@/lib/objectset'
import IDomain from '@/types/IDomain'
import { StoreOptions } from 'vuex'
import { deleteDomain, fetchDomains } from './helper'

interface DomainState {
  domains: IDomain[];
}

export default {
	namespaced: true,
	state: {
		domains: [],
	},
	mutations: {
		setDomains(state, domains: IDomain[]) {
			state.domains = [...domains]
		},
		updateDomains(state, domains: IDomain[]) {
			const domainSet = new ObjectSet([...state.domains, ...domains], 'id')
			state.domains = [...domainSet]
		},
		deleteDomain(state, id: string) {
			const index = state.domains.findIndex((domain) => domain.id == id)
			if (index < 0) return
			const domains = [...state.domains]
			domains.splice(index, 1)
			state.domains = [...domains]
		},
	},
	actions: {
		async fetchDomains(ctx) {
			const domains = await fetchDomains()
			ctx.commit('setDomains', domains)
		},
		async getDomainById(ctx, id: string) {
			if (ctx.state.domains.length < 1) await ctx.dispatch('fetchDomains')
			return ctx.state.domains.find((domain) => domain.id == id)
		},
		async deleteDomain(ctx, id: string) {
			const deleted = await deleteDomain(id)
			if (!deleted) return false
			ctx.commit('deleteDomain', id)
			return true
		},
	},
} as StoreOptions<DomainState>
