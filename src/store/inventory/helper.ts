import { cornieClient } from "@/plugins/http";

//Inventory Category
export async function createInventoryCategory(data: any) {
  try {
    const response = await cornieClient().post(
      "/api/v1/inventory/settings/category",
      data
    );
    return response.data;
  } catch (error) {
    notify({ msg: "There was an error creating category", status: "error" });
  }
}

export async function updateInventoryCategory(id: string, data: any) {
  try {
    const response = await cornieClient().put(
      `/api/v1/inventory/classes/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    notify({ msg: "There was an error updating categories", status: "error" });
  }
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
  try {
    const response = await cornieClient().delete(
      `/api/v1/inventory/classes/${id}`
    );
    return response.data;
  } catch (error) {
    notify({ msg: "There was an error deleting category", status: "error" });
  }
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
  try {
    const response = await cornieClient().post(
      "/api/v1/inventory/settings/location",
      data
    );
    return response.data;
  } catch (error) {
    notify({ msg: "There was an error creating location", status: "error" });
  }
}

export async function deactivateL(id: string) {
  try {
    const response = await cornieClient().patch(
      `/api/v1/inventory/settings/location/deactivate/${id}`,
      {}
    );
    return response.data;
  } catch (error) {
    notify({
      msg: "There was an error deactivating location",
      status: "error",
    });
  }
}

export async function activateL(id: string) {
  try {
    const response = await cornieClient().patch(
      `/api/v1/inventory/settings/location/activate/${id}`,
      {}
    );
    return response.data;
  } catch (error) {
    notify({
      msg: "There was an error activating location",
      status: "error",
    });
  }
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

export async function getLocationsByManager(id: string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/inventory/locations/findAllByManager/${id}`
    );
    return response.data;
  } catch (error) {
    notify({ msg: "There was an error fetching locations", status: "error" });
  }
}

export async function updateInventoryLocation(id: string, data: any) {
  try {
    const response = await cornieClient().put(
      `/api/v1/inventory/locations/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    notify({ msg: "There was an error updating Location", status: "error" });
  }
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
