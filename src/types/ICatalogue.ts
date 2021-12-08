export default interface ICatalogueService {
    id?: string,
    image: string,
    category: string,
    subcategory: string,
    name: string,
    description: string,
    itemCode: string,
    serviceUOM: string,
    quantity: number,
    cost: number,
    markup: number,
    discountLimit: number,
    applyVat: boolean,
    status: string,
    organizationId?: string,
    updatedAt?: string | Date,
    createdAt?: string | Date,
  }

  export interface ICatalogueProduct {
    id: string,
    organizationId: string,
    type: string,
    category: string,
    genericName: string,
    image: string,
    brand: string,
    ingredient: string,
    ingredientStatus: string,
    status: string,
    description: string,
    regNo: string,
    variants: IProductVariant[],
    size: string,
    inventoryUOM: IInventoryUOM,
    purchaseUOM: IInventoryUOM,
    salesUOMs: ISalesUOM[],
    costInformation: ICostInformation[],
    applyVAT: boolean,
    inventory: IInventory,
    storage: IIStorage,
    purchaseType: string,
    updatedAt: Date | string,
  }

  export interface IProductVariant {
    id: string,
    image: string,
    form: string,
    pack: string,
    packQuantity: number,
    strength: string
  }

  export interface IInventoryUOM {
    unitName: string,
    itemQuantity: number
  }

  export interface ISalesUOM {
    unitName: string,
    itemQuantity: number,
    markup: number,
    discountLimit: number
  }

  export interface ICostInformation {
    type: string,
    unitCost: number,
    availableQuantity: number,
    supplier: string,
    default: boolean
  }

  export interface IInventory {
    itemCode: string,
    valuationMethod: string,
    openingBalance: number,
    reorderLevel: number,
    batchNo: string,
    expiryDate: Date | string
  }

  export interface IIStorage {
    locationId: string,
    room: string,
    rack: string,
    bin: string,
    condition: string
  }