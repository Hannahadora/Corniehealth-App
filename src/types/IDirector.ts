export default interface IDirector {
    id: string;
    fullName: string;
    dateOfBirth: string;
    nationality: string;
    emailAddress: string;
    phoneNumber: {
        number: string,
        dialCode: string
    };
    identificationDocumentType: string;
    identificationDocumentNumber: string;
    identificationDocument: string;
    practiceLicenseDocumentType: string;
    practiceLicenseNumber: string;
    practiceLicenseDocument: string;
   
  }
  