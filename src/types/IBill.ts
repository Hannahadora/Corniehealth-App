import ILocation, { HoursOfOperation } from "./ILocation";

export default interface IBill {
    id?: string,
    quantity: number,
    serviceId: string,
    billId: string,
    catalogueService: {
      id: string,
      image: string,
      category: string,
      subcategory: string,
      name: string,
      description: string,
      itemCode: string,
      serviceUOM: string,
      quantity: number,
      cost: string,
      markup: number,
      discountLimit: number,
      applyVat: true,
      status: string,
      organizationId: string,
      specialty: string,
      type: string,
      locations: ILocation[],
      coverageArea: string,
      providedBy: string,
      priced: true,
      referralMethod: string,
      requiresAppointment: true,
      telecom: string,
      channelOfService: string,
      availabilityExceptions: [
        string
      ],
      availableTimes: HoursOfOperation[]
    }
}