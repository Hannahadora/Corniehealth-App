import { cornieClient } from "@/plugins/http";
import IProcedure from "../../types/IProcedure";

export async function getProcedures(patientId: string) {
    try {
        const response = await cornieClient().get(
            `/api/v1/procedure/patient/${patientId}`
        );

        return response.data;
    } catch (error) {
        notify({ msg: "There was an error fetching procedures", status: "error" });
    }
    return {};
}

export async function createProcedure(body: IProcedure) {
    try {
        const response = await cornieClient().post("/api/v1/procedure", body);

        if (response?.data?.id)
            notify({ msg: "Procedure created successfully", status: "success" });
        return response.data as boolean;
    } catch (error) {
        notify({ msg: "procedure creation failed", status: "error" });
    }
}

export async function updateVitalStatus(body: any, vitalId: string) {
    try {
        const response = await cornieClient().put(
            `/api/v1/vitals/status/${vitalId}`,
            body
        );

        notify({ msg: "Vitals status updated successfully", status: "success" });

        return response.data as boolean;
    } catch (error) {
        notify({ msg: "Vitals status updated failed", status: "error" });
    }
}

export async function updateProcedure(body: IProcedure, procedureId: string) {
    try {
        const response = await cornieClient().put(
            `/api/v1/procedure/${procedureId}`,
            body
        );

        notify({ msg: "Procedure updated successfully", status: "success" });

        return response.data;
    } catch (error) {
        notify({ msg: "Procedure update failed", status: "error" });
    }
}
