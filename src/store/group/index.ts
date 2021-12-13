import ObjectSet from '@/lib/objectset'
import IGroup from '@/types/IGroup'
import { StoreOptions } from 'vuex'
import { deleteGroup, fetchGroups } from './helper'

interface GroupState {
  groups: IGroup[];
}

export default {
	namespaced: true,
	state: {
		groups: [],
	},
	mutations: {
		setGroups(state, groups: IGroup[]) {
			state.groups = [...groups]
		},
		updateGroups(state, groups: IGroup[]) {
			const groupSet = new ObjectSet([...state.groups, ...groups], 'id')
			state.groups = [...groupSet]
		},
		deleteGroup(state, id: string) {
			const index = state.groups.findIndex((group) => group.id == id)
			if (index < 0) return
			const groups = [...state.groups]
			groups.splice(index, 1)
			state.groups = [...groups]
		},
	},
	actions: {
		async fetchGroups(ctx) {
			const groups = await fetchGroups()
			ctx.commit('setGroups', groups)
		},
		async getGroupById(ctx, id: string) {
			if (ctx.state.groups.length < 1) await ctx.dispatch('fetchGroups')
			return ctx.state.groups.find((group) => group.id == id)
		},
		async deleteGroup(ctx, id: string) {
			const deleted = await deleteGroup(id)
			if (!deleted) return false
			ctx.commit('deleteGroup', id)
			return true
		},
	},
} as StoreOptions<GroupState>
