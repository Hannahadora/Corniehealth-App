import { cornieClient } from "@/plugins/http";

//Inventory Category
export async function createInventoryCategory(data: any) {
  return await cornieClient().post("/api/v1/inventory/settings/category", data);
}

export async function updateInventoryCategory(id: string, data: any) {
  return await cornieClient().put(
    `/api/v1/inventory/settings/category/${id}`,
    data
  );
}

export async function deactivateC(id: string) {
  return await cornieClient().patch(
    `/api/v1/inventory/settings/category/deactivate/${id}`,
    {}
  );
}

export async function activateC(id: string) {
  return await cornieClient().patch(
    `/api/v1/inventory/settings/category/activate/${id}`,
    {}
  );
}

export async function getInventoryCategory() {
  try {
    const response = await cornieClient().get(
      "/api/v1/inventory/settings/category"
    );
    return response.data;
  } catch (error) {
    notify({ msg: "There was an error fetching categories", status: "error" });
  }
}

export async function deleteInventoryCategory(id: string) {
  return await cornieClient().delete(`/api/v1/inventory/classes/${id}`);
}

export async function getInventoryCategoriesByUser(id: string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/inventory/classes/findAllByOrganization/${id}`
    );
    return response.data;
  } catch (error) {
    notify({ msg: "There was an error fetching categories", status: "error" });
  }
}

//Inventory Location
export async function createInventoryLocationClasses(data: any) {
  try {
    const response = await cornieClient().post(
      "/api/v1/inventory/locations/addClasses",
      data
    );
    return response.data;
  } catch (error) {
    notify({ msg: "There was an error creating category", status: "error" });
  }
}

export async function createInventoryLocation(data: any) {
  return await cornieClient().post("/api/v1/inventory/settings/location", data);
  // try {
  //   const response = await cornieClient().post(
  //     "/api/v1/inventory/settings/location",
  //     data
  //   );
  //   return response.data;
  // } catch (error) {
  //   notify({ msg: "There was an error creating location", status: "error" });
  //   return error;
  // }
}

export async function deactivateL(id: string) {
  return await cornieClient().patch(
    `/api/v1/inventory/settings/location/deactivate/${id}`,
    {}
  );
}

export async function activateL(id: string) {
  return await cornieClient().patch(
    `/api/v1/inventory/settings/location/activate/${id}`,
    {}
  );
}

export async function getLocationsByUser() {
  try {
    const response = await cornieClient().get(
      "/api/v1/inventory/settings/location/"
    );
    return response.data;
  } catch (error) {
    notify({ msg: "There was an error fetching locations", status: "error" });
  }
}

export async function updateInventoryLocation(id: string, data: any) {
  return await cornieClient().put(
    `/api/v1/inventory/settings/location/${id}`,
    data
  );
}

export async function getInventoryLocation(id: string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/inventory/locations/${id}`
    );
    return response.data;
  } catch (error) {
    notify({ msg: "There was an error fetching location", status: "error" });
  }
}

export async function deleteInventoryLocation(id: string) {
  try {
    const response = await cornieClient().delete(
      `/api/v1/inventory/locations/${id}`
    );
    return response.data;
  } catch (error) {
    notify({ msg: "There was an error deleting location", status: "error" });
  }
}

export async function createInventoryValuation(data: any) {
  try {
    const response = await cornieClient().post("/api/v1/inventory/valuations", {
      valuation: data,
    });
    return response.data;
  } catch (error) {
    notify({
      msg: "There was an error creating inventory valuation",
      status: "error",
    });
  }
}

export async function getAllInventoryValuation() {
  try {
    const response = await cornieClient().get("/api/v1/inventory/valuations");
    return response.data;
  } catch (error) {
    notify({ msg: "There was an error fetching valuations", status: "error" });
  }
}

export async function updateInventoryValuation(data: any) {
  const { id, valuation } = data;
  try {
    const response = await cornieClient().put(
      `/api/v1/inventory/valuations/${id}`,
      {
        valuation,
      }
    );
    return response.data;
  } catch (error) {
    notify({
      msg: "There was an error creating inventory valuation",
      status: "error",
    });
  }
}
