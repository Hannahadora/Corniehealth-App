import { cornieClient } from "@/plugins/http";

export async function getPractitioner() {
  try {
    const response = await cornieClient().get(
        "/api/v1/practitioner"
    );
    return response.data;
  } catch (error) {
    notify({ msg: "There was an error fetching practictioner's data", status: "error" });
  }
  return { };
}

export async function getRoles() {
  try {
    const response = await cornieClient().get(
        "/api/v1/roles/"
    );
      console.log(response.data, "roles");
      
    return response.data;
  } catch (error) {
    notify({ msg: "There was an error fetching roles", status: "error" });
  }
  return { };
}

export async function getOrg() {
  try {
    const response = await cornieClient().get(
        "/api/v1/organization/myOrg/get"
    );
      console.log(response.data, "ORG");
      
    return response.data;
  } catch (error) {
    notify({ msg: "There was an error fetching roles", status: "error" });
  }
  return { };
}

export async function deleteRole(id: string) {
  try {
    const response = await cornieClient().delete(`/api/v1/roles/${id}`);
    return response.data as any;
  } catch (error) {
    notify({
      msg: "There was an error deleting this role",
      status: "error",
    });
  }
}

export async function createRole(role: any) {
  try {
    const response = await cornieClient().post(`/api/v1/roles/`, role);
    notify({
      msg: "Role created successfully",
      status: "success",
    });
    return response.data as any;
  } catch (error) {
    notify({
      msg: "There was an error deleting this role",
      status: "error",
    });
  }
}

export async function transferRight(body: any) {
  try {
    const response = await cornieClient().post(`/api/v1/transfer-admin/`, body);
    console.log(response, "transfer");
    
    return response.data as any;
  } catch (error) {
    notify({
      msg: "There was an error deleting this role",
      status: "error",
    });
  }
}

