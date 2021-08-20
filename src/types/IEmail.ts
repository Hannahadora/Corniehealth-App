export default interface IEmail {
    id: string;
    address: string;
    otp: string | null;
    timeDateToExpire: string | Date | null;
    organizationId: string;
    verified: boolean;
    createdAt: string | Date;
    updatedAt: string | Date;
}