export default interface IAttachment {
  id?: string;
  title: string;
  imageUrl: string;
  comment: string;
  patientId: string;
  format: string;
  fileSize: string;
}
