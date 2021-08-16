import { cornieClient, quantumClient } from "@/plugins/http";

export async function getDormains() {
  try {
    const response = await cornieClient().get(
        "/api/v1//domain/myOrg/getMyOrgdomains"
    );
    return response.data;
  } catch (error) {
    notify({ msg: "There was an error fetching domains", status: "error" });
  }
  return { };
}


export async function postSignature(body: any) {
  try {
    const response = await cornieClient().post(`/api/v1//signature`, body);
    
    return response.success as boolean;
  } catch (error) {
    notify({
      msg: "There was an error posting this signature",
      status: "error",
    });
  }
}

export async function changePassword(body: any) {
  try {
    const response = await quantumClient().post(`/auth/change-password`, body);

    console.log(response, "change password");
    
    return response.success as boolean;
  } catch (error) {
    notify({
      msg: "There was an error changing your password",
      status: "error",
    });
  }
}

export async function setUserUp(body: any) {
  try {
    const response = await cornieClient().post(`/api/v1/user/practitioner`, body);
    notify({
      msg: "Profile setup successfully",
      status: "success",
    });
    return response.data as any;
  } catch (error) {
    notify({
      msg: "There was an error setting up your profile",
      status: "error",
    });
  }
}

