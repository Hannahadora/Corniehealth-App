import { cornieClient } from "@/plugins/http";

export async function getSchedules() {
  try {
    const response = await cornieClient().get(
        "/api/v1/schedule"
    );
      
    return response.data;
  } catch (error) {
    notify({ msg: "There was an error fetching schedules", status: "error" });
  }
  return { };
}

export async function deleteSchedule(id: string) {
  try {
    const response = await cornieClient().delete(`/api/v1/schedule/${id}`);
    
    return response.success as boolean;
  } catch (error) {
    notify({
      msg: "There was an error deleting this shift",
      status: "error",
    });
  }
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

export async function updateSchedule(body: any, id: string) {
  try {
    const response = await cornieClient().put(`/api/v1/schedule/${id}`, body);
    
    return response.data as boolean;
  } catch (error) {
    notify({
      msg: "There was an error updating this schedule",
      status: "error"
    });
  }
}

export async function activateSchedule(id: any) {
  try {
    const response = await cornieClient().post(`/api/v1/schedule/activate/${id}`, { });
    
    return response.success as boolean;
  } catch (error) {
    notify({
      msg: "There was an error activating this schedule",
      status: "error",
    });
  }
}

export async function removePractitioner(body: any, id: any) {
  try {
    const response = await cornieClient().post(`/api/v1/schedule/remove-practitioners/${id}`, body);
    console.log(response, "RESPONSE");
    
    return response.success as boolean;
  } catch (error) {
    notify({
      msg: "There was an error removing this actor",
      status: "error",
    });
  }
}

export async function addPractitioner(body: any, id: any) {
  try {
    const response = await cornieClient().post(`/api/v1/schedule/add-practitioners/${id}`, body);
    
    return response.success as boolean;
  } catch (error) {
    notify({
      msg: "There was an error adding this actor",
      status: "error",
    });
  }
}

export async function deactivateSchedule(id: any) {
  try {
    const response = await cornieClient().post(`/api/v1/schedule/deactivate/${id}`, { });
    
    return response.success as boolean;
  } catch (error) {
    notify({
      msg: "There was an error deactivating this schedule",
      status: "error",
    });
  }
}

export async function updateShift(shift: any, id: string) {
  try {
    const response = await cornieClient().put(`/api/v1/shifts/${id}`, shift);
    notify({
      msg: "Shift updated successfully",
      status: "success",
    });
    return response.data as any;
  } catch (error) {
    notify({
      msg: "There was an error updating this shift",
      status: "error",
    });
  }
}

