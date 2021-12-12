import { cornieClient } from '@/plugins/http'

export async function getPractitioner() {
	try {
		const response = await cornieClient().get('/api/v1/practitioner')
		return response.data
	} catch (error) {
		notify({
			msg: 'There was an error fetching practictioner\'s data',
			status: 'error',
		})
	}
	return {}
}

export async function getRoles() {
	try {
		const response = await cornieClient().get('/api/v1/roles/')


		return response.data
	} catch (error) {
		notify({ msg: 'There was an error fetching roles', status: 'error' })
	}
	return {}
}

export async function getOrg() {
	try {
		const response = await cornieClient().get('/api/v1/organization/myOrg/get')


		return response.data
	} catch (error) {
		notify({ msg: 'There was an error fetching roles', status: 'error' })
	}
	return {}
}

export async function getShifts() {
	try {
		const response = await cornieClient().get('/api/v1//shifts')


		return response.data
	} catch (error) {
		notify({ msg: 'There was an error fetching shifts', status: 'error' })
	}
	return {}
}

export async function deleteShift(id: string) {
	try {
		const response = await cornieClient().post(
			`/api/v1/shifts/deactivate/${id}`,
			{}
		)



		return response.success as boolean
	} catch (error) {
		notify({
			msg: 'There was an error deactivating this shift',
			status: 'error',
		})
	}
}

export async function destroyShift(id: string) {
	try {
		const response = await cornieClient().delete(`/api/v1/shifts/${id}`, {})



		return response.success as boolean
	} catch (error) {
		notify({
			msg: 'There was an error deleting this shift',
			status: 'error',
		})
	}
}

export async function activateShift(id: string) {
	try {
		const response = await cornieClient().post(
			`/api/v1/shifts/activate/${id}`,
			{}
		)



		return response.success as boolean
	} catch (error) {
		notify({
			msg: 'There was an error activating this shift',
			status: 'error',
		})
	}
}

export async function createShift(shift: any) {
	try {
		const response = await cornieClient().post('/api/v1/shifts', shift)
		notify({
			msg: 'Shift created successfully',
			status: 'success',
		})
		return response.data as any
	} catch (error) {
		notify({
			msg: 'There was an error creating this shift',
			status: 'error',
		})
	}
}

export async function updateShift(shift: any, id: string) {
	try {
		const response = await cornieClient().put(`/api/v1/shifts/${id}`, shift)
		notify({
			msg: 'Shift updated successfully',
			status: 'success',
		})
		return response.data as any
	} catch (error) {
		notify({
			msg: 'There was an error updating this shift',
			status: 'error',
		})
	}
}

export async function transferRight(body: any) {
	try {
		const response = await cornieClient().post(
			'/api/v1/roles/transfer-admin/',
			body
		)

		notify({
			msg: 'Right transfered successfully',
			status: 'success',
		})
		return response.data as any
	} catch (error) {
		notify({
			msg: 'There was an error transfering right',
			status: 'error',
		})
	}
}
