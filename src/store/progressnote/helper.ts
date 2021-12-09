import { cornieClient } from '@/plugins/http'
import IAllergy from '@/types/IAllergy'
import IProgressnote from '@/types/Iprogressnote'
import { string } from 'yup/lib/locale'

export async function fetchProgressNote(patientId: string) {
	try {
		const response = await cornieClient().get(
			`/api/v1/progress-notes/${patientId}`
		)
		if (response.success) {
			return response.data
		}
	} catch (error) {

	}
	return [] as IPro[]
}

export async function fetchAllergys(patientId: string) {
	try {
		const response = await cornieClient().get(
			`/api/v1/allergy/findAllByPatient/${patientId}`
		)
		if (response.success) {
			return response.data
		}
	} catch (error) {

	}
	return [] as IAllergy[]
}

export async function deleteAllergy(id: string) {
	try {
		const response = await cornieClient().delete(`/api/v1/allergy/${id}`)
		if (response.success) {
			return true
		}
	} catch (error) {
		return false
	}
	return false
}
export async function getPractitioners() {
	try {
		const response = await cornieClient().get('/api/v1/practitioner')
		return response.data
	} catch (error) {
		notify({
			msg: 'There was an error fetching practitoners',
			status: 'error',
		})
	}
	return {}
}
