export default interface IInventroyStock {
    id?: string;
    code: string;
    name: string;
    brand: string;
    form: string;
    strength: string;
    packSize: string;
    uom: string;
    opening: number;
    issued: number;
    added: number;
    balance: number;
    unitPrice: number;
    status: string;
    productId: string;
    category: string;
    sourceId: string;
    quantity: number;
    recipient : {
        locationId : string,
        category: string,
        productId: string
      }
  }
  