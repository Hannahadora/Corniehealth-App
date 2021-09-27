import { cornieClient, quantumClient } from "@/plugins/http";
import { IPatient } from "@/types/IPatient";
import IPractitioner from "@/types/IPractitioner"

interface Credential {
    userId: string,
    password: string,
}

const authenticateUser = async (payload: Credential) => {
  try {
    const { data  } = await quantumClient().post("/org/security/passwords/confirm", payload);
    console.log(data, "confirm data");
    
    return data?.success ? true : false;     
  } catch (error) {
      console.log(error);
      window.notify({ msg: "Authentication failed", status: "error" });
      return false;
  }
}

const searchPatient = async (query: string) => {
  try {
    const { data } = await cornieClient().get(`/api/v1/patient/search`, { query });
    return data;     
  } catch (error) {
      console.log(error);
      window.notify({ msg: "Search failed, please try again", status: "error" });
      return false;
  }
}

const getActiveVisits = (visits: any, practitionerId: string, patients: IPatient[]) => {
  console.log(practitionerId);
  
  if (!visits || visits.length === 0) return [ ];
  const activeVisists = visits.filter((visit: any) => visit.status?.toLowerCase() === "in-progress" || visit.status?.toLowerCase() === "active");

  const activeVisitsForPractitioner = activeVisists.filter((visit: any) => {    
    const index = visit.practitioners.findIndex((practitioner: IPractitioner) => practitioner.id === "87e846a3-bac0-43b9-a4db-0b2605426c42");
    // const index = visit.practitioners.findIndex((practitioner: IPractitioner) => practitioner.id === practitionerId);
    return index >= 0;
  })
  .map((visit: any) => visit.patientId);


  return patients.filter(patient => {
    return activeVisitsForPractitioner.findIndex((patientId: string) => patientId === patient.id) >= 0;
  });
}

  export default {
    authenticateUser,
    searchPatient,
    getActiveVisits
  }