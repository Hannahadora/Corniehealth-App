import { cornieClient } from "@/plugins/http";

export async function getVisits() {
  try {
    const response = await cornieClient().get(
        "/api/v1/visit"
    );
        
    return response.data;
  } catch (error) {
    notify({ msg: "There was an error fetching visits", status: "error" });
  }
  return { };
}

export async function createSchedule(body: any) {
  try {
    const response = await cornieClient().post(`/api/v1/schedule`, body);
    console.log(response, "created schedlue");
    
    return response.data as boolean;
  } catch (error) {
    notify({
      msg: "There was an error creating this schedule",
      status: "error"
    });
  }
}


