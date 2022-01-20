export default interface IPracticeHour {
  id?: string;
  monday: {
    startDate: string;
    endDate: string;
  };
  tuesday: {
    startDate: string;
    endDate: string;
  };
  wednesday: {
    startDate: string;
    endDate: string;
  };
  thursday: {
    startDate: string;
    endDate: string;
  };
  friday: {
    startDate: string;
    endDate: string;
  };
  saturday: {
    startDate: string;
    endDate: string;
  };
  sunday: {
    startDate: string;
    endDate: string;
  };
}
