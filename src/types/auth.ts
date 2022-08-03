export interface AuthPayload {
  email: string;
  authPassword: string;
  accountId?: string;
}

export type UserType = "patient" | "provider" | "payer";
