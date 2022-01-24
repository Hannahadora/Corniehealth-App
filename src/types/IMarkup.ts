export default interface IMarkup {
  id?: string;
  sampleUnitCost: number;
  markupPercentage: number;
  cdmPrice: number;
  margin: number;
  marginPercentage: number;
  maxAllowedDiscount: number;
  minPrice: number;
  discountedMargin: number;
  discountedMarginPercentage: number;
  locationAdminsCanSetForLocations: boolean;
}
