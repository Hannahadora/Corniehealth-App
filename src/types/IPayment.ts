interface PaymentName {
  accountName?: string;
  accountNumber?: string;
  bank?: string;
  paymentCategories?: string;
  location?: string;
}

export default interface IPayment{
    id?: string;
   paymentName: PaymentName;
  }
