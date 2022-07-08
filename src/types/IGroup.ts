import { IndexableObject } from "@/lib/http";
import Period from "./IPeriod";
export default interface IGroup {
  id?: string;
  state: string;
  status: string;
  type: string;
  name: string;
  code: null;
  quantity: string;
  managingEntity: string;
  characteristicsCode: string;
  valueCodeableConcept: string;
  valueBoolean: string;
  valueQuantity: string;
  valueRange: string;
  valueRef: string;
  exclude: string;
  period: Period;
  memberPeriod: string;
  memberStatus: string;
  memberEntity: string;
  members: IndexableObject
}
