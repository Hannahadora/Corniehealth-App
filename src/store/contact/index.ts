import ObjectSet from '@/lib/objectset'
import IContact from '@/types/IContact'
import { StoreOptions } from 'vuex'
import { fetchContacts, deleteContact } from './helper'

interface ContactState {
  contacts: IContact[];
}

export default {
	namespaced: true,
	state: {
		contacts: [],
	},
	mutations: {
		setContacts(state, contacts: IContact[]) {
			state.contacts = [...contacts]
		},
		updateContacts(state, contacts: IContact[]) {
			const contactSet = new ObjectSet([...state.contacts, ...contacts], 'id')
			state.contacts = [...contactSet]
		},
		deleteContact(state, id: string) {
			const index = state.contacts.findIndex((contact) => contact.id == id)
			if (index < 0) return
			const contacts = [...state.contacts]
			contacts.splice(index, 1)
			state.contacts = [...contacts]
		},
	},
	actions: {
		async fetchContacts(ctx) {
			const contacts = await fetchContacts()
			ctx.commit('setContacts', contacts)
		},
		async getContactById(ctx, id: string) {
			if (ctx.state.contacts.length < 1) await ctx.dispatch('fetchContacts')
			return ctx.state.contacts.find((contact) => contact.id == id)
		},
		async deleteContact(ctx, id: string) {
			const deleted = await deleteContact(id)
			if (!deleted) return false
			ctx.commit('deleteContact', id)
			return true
		},
	},
} as StoreOptions<ContactState>
