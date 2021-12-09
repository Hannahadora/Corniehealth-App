import { cornieClient } from '@/plugins/http'
import ICarePlan from '@/types/ICarePlan'

export async function getCarePlans(patientId: string) {
	try {
		const response = await cornieClient().get(
			`/api/v1/care-plan/patient/${patientId}`
		)
		console.log(response, 'RRREEESSSPONNNSE')

		return response.data
	} catch (error) {
		notify({ msg: 'There was an error loading care plans', status: 'error' })
	}
	return {}
}

export async function createCarePlan(body: any) {
	try {
		const response = await cornieClient().post('/api/v1/care-plan', body)
		console.log(response, 'CAre Plan')

		return response.data as boolean
	} catch (error) {
		console.log(error)

		// notify({
		//   msg: "There was an error creating this slot",
		//   status: "error"
		// });
	}
}

export async function updateCarePlan(body: ICarePlan) {
	try {
		const response = await cornieClient().put(
			`/api/v1/care-plan/${body.id}`,
			body
		)
		console.log(response, 'Updated Plan')

		return response.data as boolean
	} catch (error) {
		console.log(error)

		// notify({
		//   msg: "There was an error creating this slot",
		//   status: "error"
		// });
	}
}
