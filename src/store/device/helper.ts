import { IndexableObject } from '@/lib/http'
import { cornieClient } from '@/plugins/http'
import localstore from '@/plugins/localstore'
import IDevice from '@/types/IDevice'

export async function fetchDropDowns(): Promise<IndexableObject> {
	let dropdowns
	dropdowns = fetchLocalDropdowns()
	if (dropdowns) return dropdowns
	dropdowns = await fetchRemoteDropdowns()
	localstore.put('dropdowns', dropdowns)
	return dropdowns
}

async function fetchRemoteDropdowns() {
	try {
		const resp = await cornieClient().get('/api/v1/devices/dropdowns')
		return resp.data
	} catch (error) {

	}
}

function fetchLocalDropdowns(): any {
	return localstore.get('dropdowns')
}

export async function fetchDevices(): Promise<IDevice[]> {
	try {
		const res = await cornieClient().get('/api/v1/devices')
		return res.data as IDevice[]
	} catch (error) {
		window.notify({ msg: 'Failed to fetch devices', status: 'error' })
	}
	return []
}

export async function deleteDevice(id: string): Promise<boolean> {
	try {
		const response = await cornieClient().delete(`/api/v1/devices/${id}`)
		if (response.success) return true
	} catch (error) {
		return false
	}
	return false
}
