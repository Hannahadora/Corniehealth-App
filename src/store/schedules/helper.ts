import { cornieClient } from "@/plugins/http";

export async function getSchedules(page = 1, limit?: number) {
  limit = limit ?? 10;
  try {
    const response = await cornieClient().get("/api/v1/schedule", {page, limit});
    const { currentPage, nextPage, numberOfPages, previousPage} = response;
    const pageInfo = {currentPage, nextPage, numberOfPages, previousPage }
    return {data: response.data, pageInfo};
  } catch (error) {
    notify({ msg: "There was an error fetching schedules", status: "error" });
  }
  return {data:[], pageInfo:{}};
}
export async function singlePractitonerSlot(locationId: string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/schedule/slot/${locationId}`
    );
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
}

export async function FetchDayCalendar(locationId: string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/calendar/organization/${locationId}/day-view`
    );
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
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
    const response = await cornieClient().post("/api/v1/schedule", body);

    return response.data as boolean;
  } catch (error) {
    notify({
      msg: "There was an error creating this schedule",
      status: "error",
    });
  }
}

export async function deleteSlot(id: string) {
  try {
    const response = await cornieClient().delete(`/api/v1/schedule/slot/${id}`);
    return response.data as boolean;
  } catch (error) {
    notify({
      msg: "There was an error deleting this slot",
      status: "error",
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
      status: "error",
    });
  }
}

export async function activateSchedule(id: any) {
  try {
    const response = await cornieClient().post(
      `/api/v1/schedule/activate/${id}`,
      {}
    );

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
    const response = await cornieClient().post(
      `/api/v1/schedule/remove-practitioners/${id}`,
      body
    );

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
    const response = await cornieClient().post(
      `/api/v1/schedule/add-practitioners/${id}`,
      body
    );

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
    const response = await cornieClient().post(
      `/api/v1/schedule/deactivate/${id}`,
      {}
    );

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


export async function removeService(body: any, id: any) {
  try {
    const response = await cornieClient().post(
      `/api/v1/schedule/remove-services/${id}`,
      body
    );

    return response.success as boolean;
  } catch (error) {
    notify({
      msg: "There was an error removing this service",
      status: "error",
    });
  }
}


export async function removeBreak(body: any, id: any) {
  try {
    const response = await cornieClient().post(
      `/api/v1/schedule/break/${id}`,
      body
    );

    return response.success as boolean;
  } catch (error) {
    notify({
      msg: "There was an error removing this break",
      status: "error",
    });
  }
}


