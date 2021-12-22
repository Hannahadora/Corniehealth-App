import Period from "./IPeriod";

export default interface IAppointmentTypes {
  id?: string;
  duration: Period;
  practitioners: Array<string>;
  linkForms: Array<string>;
  bookingSiteLink: string;
  serviceId: string;
  appointmentConfirmation: string;
}
