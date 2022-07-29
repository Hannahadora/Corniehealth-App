export default interface ICollectionCenters {
    id?: string;
    private: {
        clinical: string,
        diagnostics: string,
        pharmacy: string,
        inPatient: string,
        RCM: string
    };
    HMO: {
        clinical: string,
        diagnostics: string,
        pharmacy: string,
        inPatient: string,
        RCM: string
    };
    self_funded: {
        clinical: string,
        diagnostics: string,
        pharmacy: string,
        inPatient: string,
        RCM: string
    };
   
}
  