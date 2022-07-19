export default interface IWaybill {
    id?: string;
    identifier: string;
    issuerLocationId: string;
    issuerCategory: string;
    status: string;
    issuerId: string;
    organizationId: string;
    issuer: {
        name: string;
        email: string;
        phone: {
            number: string,
            dialCode: string
          }
    };
    locationId: string;
    category: string;
    receiverName: string;
    receiverLocationId: string;
    receiverCategory: string;
    receiverCountry: string;
    receiverState: string;
    receiverContactPhone: {
        number: string,
        dialCode: string
      };
      receiverCity: string;
      receiverZipCode: string;
      receiverStreetName: string;
      receiverHouseNumber: string;
      receiverContactName: string;
      receiverContactEmail: string;
      submittedOn: Date;
    items: Items[];
    materialRequestId: string;
    materialReturnId: string;
    referenceIdentifier: string;
  
  }
export interface Items {
    productId: string;
    itemName: string;
    itemCode: string;
    brand: string;
    form: string;
    strength: string;
    batchNumber: string;
    expiry: string;
    uom: string;
    packSize: string;
    unitCost: number;
    quantity: number;
}
    
  