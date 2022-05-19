export default interface IMaterialRequest {
    id?: string;
    identifier: string;
    organizationId: string;
    validity: string;
    status: boolean;
    requesterId: string;
    requesterLocationId: string;
    requesterCategory: string;
    supplyCategory: string;
    supplyLocationId: string;
    supplyContactName: string;
    supplyContactEmail: string;
    supplyContactPhone: {
        number: string,
        dialCode: string
      };
    description: string;
    dateRequested: Date;
    dateApproved: string;
    department: string;
    requestedBy: {
          name: string,
          email: string,
          phone: {
            number: string,
            dialCode: string
          }
    };
    items: Items[];
   
  
  }
export interface Items {
      name: string;
      code: string;
      brand: string;
      form: string;
      strength: string;
      uofm: string;
      packSize: string;
      quantity: string;
}
    
  