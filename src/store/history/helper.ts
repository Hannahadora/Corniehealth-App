import { cornieClient } from "@/plugins/http";


// export async function fetchHistorys(patientId: string, page = 1, limit?: number) {
//   limit = limit ?? 10;
//   try {
//     const response = await cornieClient().get(
//       `/api/v1/family-history/get-for-patient/${patientId}`, {page, limit}
//     );
//     const { currentPage, nextPage, numberOfPages, previousPage} = response;
//     const pageInfo = {currentPage, nextPage, numberOfPages, previousPage }
//     if (response.success) {
//       return {data: response.data, pageInfo};
//     }
//   } catch (error) {}
//   return {data:[], pageInfo:{}};
// }
export async function fetchHistorys(patientId:string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/family-history/get-for-patient/${patientId}`);
  
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return {data:[], pageInfo:{}};
}

export async function deleteHistory(id: string) {
  try {
    const response = await cornieClient().delete(
      `/api/v1/family-history/${id}`
    );
    if (response.success) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}
