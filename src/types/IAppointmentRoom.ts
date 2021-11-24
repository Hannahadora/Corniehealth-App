export default interface IAppointmentRoom {
  id: string;
  roomName: string;
  roomNumber: string;
  custodian: string;
  locationId: string;
  availability: Boolean;
  status: string;
}
