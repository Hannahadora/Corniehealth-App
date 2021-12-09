import { cornieClient } from '@/plugins/http'
import IIssues from '@/types/IIssues'

export async function fetchIssues() {
	try {
		const response = await cornieClient().get('/api/v1/detected-issue')
		if (response.success) {
			return response.data
		}
	} catch (error) {

	}
	return [] as IIssues[]
}

// export async function deleteImpression(id: string) {
//   try {
//     const response = await cornieClient().delete(`/api/v1/clinical-impressions/${id}`);
//     if (response.success) {
//       return true;
//     }
//   } catch (error) {
//     return false;
//   }
//   return false;
// }
