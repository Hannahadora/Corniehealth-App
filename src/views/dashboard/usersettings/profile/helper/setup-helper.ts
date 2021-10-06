import IPractitioner from "@/types/IPractitioner";

const  constructPractitionerData = (practitioner: IPractitioner) => {
    if (!practitioner?.id) return { }
    const { gender, address, accessRole, image, jobDesignation, qualificationCode, qualificationIssuer} = practitioner;
    return {
        gender, address, accessRole, image, jobDesignation, qualificationCode, qualificationIssuer,
        type: practitioner.type,
        consultationChannel: practitioner.consultationChannel,
        communicationLanguage: practitioner.communicationLanguage,
        availabilityExceptions: practitioner.availabilityExceptions,
        activeState: practitioner.activeState,
        hoursOfOperation: practitioner.hoursOfOperation,
        name: `${practitioner.firstName} ${practitioner.lastName}`,
        dateOfBirth: new Date(practitioner.dateOfBirth ? practitioner.dateOfBirth : Date.now()),
        phone: practitioner?.phone.number ? practitioner?.phone.number : '',
        phoneCode: practitioner?.phone.code,
        qualificationIdentifier: practitioner.qualificationIdentifier ? practitioner.qualificationIdentifier : "",
    }
}

export default {
    constructPractitionerData
}