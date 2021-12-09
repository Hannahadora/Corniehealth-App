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
}

export interface Participants {
  id?: string;
  name: string;
  role: string;
  onBehalfOf: string;
  period: {
    start: string;
    end: string;
  };
  reasonCode: string;
  reasonReference: string;
  managingOrganization: string;
  phone: {
    number: string;
    dialCode: string;
  };
  email: string;
  careTeamId?: string;
  notes: string;
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
