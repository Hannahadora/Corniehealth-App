import { cornieClient } from '@/plugins/http'
import IContact from '@/types/IContact'

export async function fetchContacts() {
	try {
		const response = await cornieClient().get(
			'/api/v1/contacts/myOrg/contacts'
		)
		return response.data as IContact[]
	} catch (error) {
		notify({ msg: 'There was an error fetching contacts', status: 'error' })
	}
	return []
}

export async function deleteContact(id: string) {
	try {
		const response = await cornieClient().delete(`/api/v1/contacts/${id}`)
		return response.data as IContact[]
	} catch (error) {
		notify({
			msg: 'There was an error deleting this contact',
			status: 'error',
		})
	}
}
