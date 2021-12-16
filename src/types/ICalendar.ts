export default interface ICalendar {
  id?: string;
  onlineBookingRequirements: {
    no: number;
    type: string;
  };
  showAvailability: {
    no: number;
    type: string;
  };
  bookingNotification: {
    practiceEmail: string;
    allAddedParticipants: string;
  };
}
