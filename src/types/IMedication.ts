interface IRefill {
    medicationId: string,
    interval: string,
    intervalUnit: string,
    startDate: string,
    quantity: string,
    supplyDuration: string,
    supplyDurationUnit: string
}

export default interface IMedication {
    code: string,
    name: string,
    reference: string,
    courseOfTherapy: string,
    dosageInstruction: string,
    durationInDays: string,
    requestId: string,
    genericCode: string,
    genericName: string,
    strength: string,
    form: string,
    refills: IRefill[],
    substitutionAllowed: true,
    substitutionCode: string,
    reasonForSubstitution: string,
    reasonAgainstSubstitution: string,
    brandCode: string,
    unitPrice: string,
    quantity: string,
    available: true,
    amount: string
}