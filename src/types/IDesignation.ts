export interface IDesignation {
  orgId: string;
  id?: string;
  createdBy: string;
  name: string;
  isSupervisory: boolean;
  functionId: string;
  levelId: string;
  reportingTo?: string;
  lowerAnnualSalaryBand?: number;
  upperAnnualSalaryBand?: number;
  level?: {
    id: string;
    name: string;
    description: string;
  };
  reportsTo?: {
    id: string;
    name: string;
  };
  orgFunction?: {
    id: string;
    name: string;
  };
  costCentre: string;
}
