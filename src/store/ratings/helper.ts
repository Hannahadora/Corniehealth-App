import IRating  from "@/types/IRating";
import { cornieClient } from "@/plugins/http";

export async function fetchRatings(page = 1, limit?: number) {
  limit = limit ?? 10;
  try {
    const response = await cornieClient().get("/api/v1/ratings/findAllForMyOrg",  {page, limit});
    if (response.success) {
      const { currentPage, nextPage, numberOfPages, previousPage} = response;
      const pageInfo = {currentPage, nextPage, numberOfPages, previousPage }
      return {data: response.data, pageInfo};
    }
  } catch (error) {}
  return {data:[], pageInfo:{}};
}

export async function fetchRatingComment(id: string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/ratings/comment/findAllCommentsByRating/${id}`
    );
    if (response.success) {
      return response.data.result.filter((c:any) => c !== null);
    }
  } catch (error) {}
  return [] as IRating[];
}
export async function deleteRating(id: string) {
  try {
    const response = await cornieClient().delete(`/api/v1/ratings/${id}`);
    if (response.success) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}
export async function deleteComment(id: string) {
  try {
    const response = await cornieClient().delete(`/api/v1/ratings/comments/${id}`);
    if (response.success) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}
