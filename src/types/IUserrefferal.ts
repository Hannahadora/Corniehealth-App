export default interface IUserrefferal {
    id?: string; 
    availableCredits: number;
    successfulReferrals: number;
    referralToken: string;
    pendingCredits: number;
    transactionMade: boolean;
    name: string;
    email: string;
    onboardDate: string;
    status: string;
  }
  