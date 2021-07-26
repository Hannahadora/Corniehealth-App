export default interface ICarePartner {
    id?: string;
    identifier: string;
    name: string;
    organisationType: string;
    email: string;
    phone: { dialCode: string, number: string };
    incorporationStatus: string;
    providerProfile: string;
    incorporationType: string;
    alias?: string;
    domainName?: string;
    registrationNumber?: string;
    address?: string;
    website?: string;
    referenceOrganisation?: string;
}