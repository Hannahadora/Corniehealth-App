export default interface IMaterialReturn {
    id?: string;
    identifier: string;
    startDateTime: string;
    endDateTime: string;
    status: string;
    processedOn: Date;
    processedById: string;
    organizationId: string;
    processedBy: {
        name: string;
        email: string;
        phone: {
            number: string,
            dialCode: string
          }
    };
    locationId: string;
    category: string;
    supplyName: string;
    supplyLocationId: string;
    supplyCategory: string;
    supplyContactName: string;
    supplyContactEmail: string;
    supplyContactPhone: {
        number: string,
        dialCode: string
      };
    supplyCountry: string;
    supplyState: string;
    supplyCity: string;
    supplyZipCode: string;
    supplyStreetName: string;
    supplyAppartment: string;
    preferredProcess: string;
    items: Items[];
   
  
  }
export interface Items {
      name: string;
      code: string;
      productId: string;
      batchNumber: string;
      expiry: string;
      availableQuantity: number;
      quantity: number;
      reasonForReturn: string;
}
    
  