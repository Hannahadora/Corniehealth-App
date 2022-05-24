export default interface IGrn {
  id?: string;
  requestNumber: string;
  referenceNumber: string;
  description: string;
  receivedBy: {
    name: string,
    email: string,
    phone: {
      number: string,
      dialCode: string
    }
  };
  identifier: string;
  receiverCategory: string;
  receiverLocationId: string;
  dateReceived: Date;
  supplierCategory: string;
  supplierLocationId: string;
  supplierCountry: string;
  supplierState: string;
  supplierCity: string;
  supplierZipCode: string;
  supplierHouseNumber: string;
  supplierContactPerson: string;
  supplierPhone: {
    number: string,
    dialCode: string
  };
  supplierEmail: string;
  supplyItems: SupplyItems[];
  supplyStatus: string;
  organizationId: string;

}
export interface SupplyItems {
    type: string;
    unitCost: number;
    quantity: number;
    supplier: string;
    expiryDate: string;
    default: boolean;
    productId: string;
    locationId: string;

  }
  
