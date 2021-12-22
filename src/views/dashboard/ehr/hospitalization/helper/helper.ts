import { Item } from "../../careteam/helper/careteam-helper";

const carePlanCodes = [
    { code: "104001", display: "Excision of lesion of patella" },
    { code: "115006", display: "Fit removable orthodontic appliance" },
    { code: "119000", display: "Thoracoscopic partial lobectomy of lung" },
    { code: "121005", display: "Retrobulbar injection of therapeutic agent" },
    { code: "128004", display: "Hand microscope examination of skin" },
] as Item[];

const carePlanReasonReferences = [
    { code: "109006", display: "Anxiety disorder of childhood OR adolescence" },
    { code: "122003", display: "Choroidal hemorrhage" },
    { code: "127009", display: "Spontaneous abortion with laceration of cervix" },
    { code: "129007", display: "Homoiothermia" },
    { code: "134006", display: "Decreased hair growth" },
] as Item[];

const carePlanDetailStatus = [
    { code: "not-started", display: "Not Started" },
    { code: "scheduled", display: "Scheduled" },
    { code: "in-progress", display: "In Progress" },
    { code: "on-hold", display: "On Hold" },
    { code: "completed", display: "Completed" },
    { code: "cancelled", display: "Cancelled" },
    { code: "stopped", display: "Stopped" },
    { code: "unknown", display: "Unknown" },
    { code: "entered-in-error", display: "Enterred In Error" },
] as Item[];

export default {
    carePlanCodes,
    carePlanReasonReferences,
    carePlanDetailStatus,
};
