import ObjectSet from '@/lib/objectset'
import { Category } from '@/types/ILevel'
import { StoreOptions } from 'vuex'
import { fetchCategories } from './helper'

interface HierarchyState {
  categories: Category[];
}

export default {
	namespaced: true,
	state: {
		categories: [],
	},
	mutations: {
		setCategories(state, payload: Category[]) {
			const categorySet = new ObjectSet(
				[...state.categories, ...payload],
				'id'
			)
			state.categories = [...categorySet]
		},
	},
	actions: {
		async fetchCategories(ctx) {
			const categories = await fetchCategories()
			ctx.commit('setCategories', categories)
		},
	},
} as StoreOptions<HierarchyState>
