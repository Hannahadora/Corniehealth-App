import ObjectSet from '@/lib/objectset'
import { LevelCollection } from '@/types/ILevel'
import { CornieUser } from '@/types/user'
import { StoreOptions } from 'vuex'
import { deleteLevel, getOrgLevels } from './helper'

interface LevelState {
  levels: LevelCollection[];
}

export default {
	namespaced: true,
	state: {
		levels: [],
	},
	mutations: {
		addLevels(state, payload: LevelCollection[]) {
			const levelsSet = new ObjectSet([...state.levels, ...payload], 'id')
			state.levels = [...levelsSet]
		},
		updateLevel(state, payload: LevelCollection) {
			const levelsSet = new ObjectSet([...state.levels, payload], 'id')
			state.levels = [...levelsSet]
		},
		remove(state, id: string) {
			state.levels = state.levels.filter((level) => level.id != id)
		},
	},
	actions: {
		async fetchLevels(ctx) {
			const { organizationId } = ctx.rootGetters[
				'user/cornieUser'
			] as CornieUser
			const levels = await getOrgLevels(organizationId)
			ctx.commit('addLevels', levels)
		},
		async removeLevel(ctx, id: string) {
			const removed = await deleteLevel(id)
			if (removed) ctx.commit('remove', id)
		},
	},
} as StoreOptions<LevelState>
