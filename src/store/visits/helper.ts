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

export async function schedulesByPractitioner() {
  try {
    const response = await cornieClient().get(
        // "/api/v1/schedule/practitioner/87e846a3-bac0-43b9-a4db-0b2605426c42"
        "/api/v1/patient"
    );
        
    return response.data;
  } catch (error) {
    notify({ msg: "There was an error fetching slots", status: "error" });
  }
  return { };
}

export async function createSlot(body: any) {
  try {
    const response = await cornieClient().post(`/api/v1/patient`, body);
    // const response = await cornieClient().post(`/api/v1/schedule/slot`, body);
    console.log(response, "slot schedlue");
    
    return response.data as boolean;
  } catch (error) {
    notify({
      msg: "There was an error creating this slot",
      status: "error"
    });
  }
}

export async function checkin(body: any) {
  try {
    const response = await cornieClient().post(`/api/v1/visit/check-in`, body);
    console.log(response, "visit schedlue");
    
    return response.data as boolean;
  } catch (error) {
    notify({
      msg: "There was an error creating this visit",
      status: "error"
    });
  }
}


