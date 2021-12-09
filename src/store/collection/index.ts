import ObjectSet from '@/lib/objectset'
import ICollection from '@/types/ICollection'
import { StoreOptions } from 'vuex'
import { fetchCollectionAccounts,deleteCollectionAccount } from './helper'

interface CollectionAccountState {
  collectionAccounts: ICollection[];
}

export default {
	namespaced: true,
	state: {
		collectionAccounts: [],
	},
	mutations: {
		setCollectionAccounts(state, collectionAccounts:ICollection[]) {
			state.collectionAccounts = [...collectionAccounts]
		},
		updateCollectionAccounts(state, collectionAccounts: ICollection[]) {
			const collectionAccountSet = new ObjectSet([...state.collectionAccounts, ...collectionAccounts], 'id')
			state.collectionAccounts = [...collectionAccountSet]
		},
		deleteCollectionAccount(state, id: string) {
			const index = state.collectionAccounts.findIndex((collectionAccount) => collectionAccount.id == id)
			if (index < 0) return
			const collectionAccounts = [...state.collectionAccounts]
			collectionAccounts.splice(index, 1)
			state.collectionAccounts = [...collectionAccounts]
		},
	},
	actions: {
		async fetchCollectionAccounts(ctx,orgId:string) {
			const collectionAccounts = await fetchCollectionAccounts(orgId)
			ctx.commit('setCollectionAccounts', collectionAccounts)
		},
		async getCollectionAccountById(ctx, id: string) {
			if (ctx.state.collectionAccounts.length < 1) await ctx.dispatch('fetchCollectionAccounts')
			return ctx.state.collectionAccounts.find((collectionAccount) => collectionAccount.id == id)
		},
		async deleteCollectionAccount(ctx, id: string) {
			const deleted = await deleteCollectionAccount(id)
			if (!deleted) return false
			ctx.commit('deleteCollectionAccount', id)
			return true
		},
	},
} as StoreOptions<CollectionAccountState>
