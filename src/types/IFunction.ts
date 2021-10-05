export default interface IFunction {
  orgId: string;
  hierarchyId: string;
  createdBy: string;
  reportingTo?: string;
  id?: string;
  name: string;
  hierarchy?: string;
  reportsTo?: { id: string; name: string };
}
