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
        "/api/v1/schedule/practitioner/87e846a3-bac0-43b9-a4db-0b2605426c42"
    );
        
    return response.data;
  } catch (error) {
    notify({ msg: "There was an error fetching slots", status: "error" });
  }
  return { };
}

export async function getPatients() {
  try {
    const response = await cornieClient().get(
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

export async function checkin(id: string) {
  try {
    const response = await cornieClient().post(`/api/v1/visit/check-in/${id}`, { });
    console.log(response, "visit checkin");
    
    return response.data as boolean;
  } catch (error) {
    notify({
      msg: "There was an error checking in this visit",
      status: "error"
    });
  }
}

export async function checkout(id: string) {
  try {
    const response = await cornieClient().post(`/api/v1/visit/check-out/${id}`, { });
    console.log(response, "visit checkout");
    
    
    return response.data as boolean;
  } catch (error) {
    notify({
      msg: "There was an error checking out this visit",
      status: "error"
    });
  }
}

export async function cancel(id: any) {
  try {
    const response = await cornieClient().post(`/api/v1/visit/cancel/${id}`, { });
    console.log(response, "visit cancel");
    
    return response.data as boolean;
  } catch (error) {
    notify({
      msg: "There was an error canceling this visit",
      status: "error"
    });
  }
}

export async function noShow(id: string) {
  try {
    const response = await cornieClient().post(`/api/v1/visit/no-show/${id}`, { });
    
    return response.data as boolean;
  } catch (error) {
    notify({
      msg: "There was an error marking this visit as no-show",
      status: "error"
    });
  }
}

export async function startEncounter(id: string) {
  try {
    const response = await cornieClient().post(`/api/v1/visit/start-encounter/${id}`, { });
    console.log(response, "visit cancel");
    
    return response.data as boolean;
  } catch (error) {
    notify({
      msg: "There was an error starting this encounter",
      status: "error"
    });
  }
}

export async function updateStatus(body: any) {
  try {
    const response = await cornieClient().post(`/api/v1/visit/update-status`, body);
    console.log(response, "visit cancel");
    
    return response.data as boolean;
  } catch (error) {
    notify({
      msg: "There was an error starting this encounter",
      status: "error"
    });
  }
}


