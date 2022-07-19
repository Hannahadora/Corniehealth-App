export default interface ICareteam {
  id?: string;
  identifier: string;
  status: string;
  category: string;
  name: string;
  subject: string;
  period: {
    start: string;
    end: string;
  };
  communication: Communication[];
  participants: Participants[];
  reasonCode: string;
  reasonReference: string;
  note: string;
  phone: string;
  email: string;
}

export interface Participants {
  practitionerId: string;
  deviceId: string;
  role: string;
  onBehalfOf: string;
  period: {
    start: string;
    end: string;
  };
}

export interface Communication {
  id: string;
  careTeamId: string;
  system: string;
  value: string;
  use: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}
