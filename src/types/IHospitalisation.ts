import User from "./user";

export interface IHospitalisation {
    origin: string,
    ward: string,
    room: string,
    bed: string,
    admitSource: string,
    reAdmission: string,
    dietPreference: string,
    specialCourtesy: string,
    specialArrangement: string,
    destination: string,
    dischargeDisposition: string,
    patientId: string,
    createdAt: string,
    id: string,
    progressNotes: IAdminNote[],
    notes: any[]
  }

  export interface IAdminNote {
    hospitalizationId: string,
    text: string,
    createdAt: string,
    updatedAt: string,
    user: User
  }