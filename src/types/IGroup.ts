export default interface IGroup{
    id?: string;
    state: string;
    type: string;
    name: string;
    code: string;
    quantity: string;
    managingEntity: string;
    characteristicsCode: string;
    valueCodeableConcept: string;
    valueBoolean: string;
    valueQuantity: string;
    valueRange: string;
    valueRef: string;
    exclude: string;
    period: string;
    memberPeriod: string;
    memberStatus: string;
    memberEntity: string;
  }
