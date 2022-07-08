import { cornieClient } from "@/plugins/http";
import IPracticeImage from "@/types/IPracticeImage";

export async function fetchpracticeImages() {
  try {
    const response = await cornieClient().get("/api/v1/practice-images");
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return [] as IPracticeImage[];
}
export async function deletePracticeImage(id: string) {
  try {
    const response = await cornieClient().delete(`/api/v1/practice-images/${id}`);
    if (response.success) return true;
  } catch (error) {
    return false;
  }
  return false;
}
