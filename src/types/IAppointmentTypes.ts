export default interface IAppointmentTypes {
  id: string;
  image: string;
  category: string;
  subcategory: string;
  name: string;
  description: string;
  itemCode: string;
  serviceUOM: string;
  quantity: 0;
  cost: string;
  markup: 0;
  discountLimit: 0;
  applyVat: true;
  status: string;
  organizationId: string;
}
