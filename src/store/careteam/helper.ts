import { cornieClient } from "@/plugins/http";
import ICareteam from "@/types/ICareteam";

export async function fetchCareteams() {
  try {
    const response = await cornieClient().get("/api/v1/care-teams/");
    return response.data as ICareteam[];
  } catch (error) {
    notify({ msg: "There was an error fetching care teams", status: "error" });
  }
  return [];
}

export async function deleteCareteam(id: string) {
  try {
    const response = await cornieClient().delete(`/api/v1/care-teams/${id}`);
    return response.data as ICareteam[];
  } catch (error) {
    notify({
      msg: "There was an error deleting this care team",
      status: "error",
    });
  }
}
