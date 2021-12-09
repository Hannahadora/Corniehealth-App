import { cornieClient } from '@/plugins/http'
import ICarePartner from '@/types/ICarePartner'

export default abstract class CarePartnersClient {
	static async create(carePartner: ICarePartner): Promise<ICarePartner> {
		try {
			const response = await cornieClient().post(
				'/api/v1/care-partners/',
				carePartner
			)
			if (response.success) return response.data as ICarePartner
			return {} as ICarePartner
		} catch (error) {
			console.log(error)
			return {} as ICarePartner
		}
	}

	static async get(): Promise<ICarePartner[]> {
		try {
			const response = await cornieClient().get('/api/v1/care-partners/')
			if (response.success) return response.data as ICarePartner[]
			return []
		} catch (error) {
			console.log(error)
			return []
		}
	}

	static async search(payload: { q: string }): Promise<ICarePartner[]> {
		try {
			const response = await cornieClient().get(
				'/api/v1/care-partners/search',
				payload
			)
			if (response.success) return response.data as ICarePartner[]
			return []
		} catch (error) {
			console.log(error)
			return []
		}
	}

	static async delete(id: string): Promise<boolean> {
		try {
			const response = await cornieClient().delete(
				`/api/v1/care-partners/${id}`
			)
			return response.success
		} catch (error) {
			console.log(error)
			return false
		}
	}
}
