import { cornieClient } from "@/plugins/http";
import { IAdminNote, IHospitalisation } from "@/types/IHospitalisation";

export async function getHospitalisations(patientId: string) {
  try {
    const response = await cornieClient().get(
      `/api/v1/hospitalization/findAllByPatient/${patientId}`
    );

    return response.data;
  } catch (error) {
    notify({
      msg: "There was an error loading hospitalisations",
      status: "error",
    });
  }
  return {};
}

export async function createHospitalisation(body: IHospitalisation) {
  try {
    const response = await cornieClient().post("/api/v1/hospitalization", body);

    return response.data as boolean;
  } catch (error) {
    // notify({
    //   msg: "There was an error creating this slot",
    //   status: "error"
    // });
  }
}

export async function createAdminNote(body: IAdminNote) {
  try {
    const { data } = await cornieClient().post(
      "/api/v1/hospitalization/admin_notes",
      body
    );

    return data;
  } catch (error) {
    // notify({
    //   msg: "There was an error creating this slot",
    //   status: "error"
    // });
  }
}

export async function updateHospitalisation(body: IHospitalisation) {
  try {
    const response = await cornieClient().put(
      `/api/v1/hospitalization/${body.id}`,
      body
    );

    return response.data as boolean;
  } catch (error) {
    // notify({
    //   msg: "There was an error creating this slot",
    //   status: "error"
    // });
  }
}
