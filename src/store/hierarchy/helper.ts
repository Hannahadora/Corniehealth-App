import { cornieClient, quantumClient } from "@/plugins/http";
import IFunction from "@/types/IFunction";

export default abstract class OrganizationHierarchyClient {
    static async createfunction(payload: {
    name: string;
    costCenter: string;
    hierarchyId: string;
    reportingTo: string;
  }): Promise<IFunction> {
        try {
            const response = await cornieClient().post(
                "/api/v1/orgHierarchy/function",
                payload
            );
            if (response.success) return response.data as IFunction;
            return {} as IFunction;
        } catch (e) {
            return {} as IFunction;
        }
    }
}

export async function getOrgLevels(orgId: string) {
    try {
        const { data } = await quantumClient().get(`/org/${orgId}/levels`);
        return data.levels;
    } catch (error) {
        window.notify({
            msg: "Failed to fetch levels for your organization",
            status: "error",
        });
    }
}

export async function deleteLevel(id: string) {
    try {
        await quantumClient().delete("/org/levels", [id]);
        window.notify({ msg: "Levell deleted", status: "success" });
        return true;
    } catch (error) {
        window.notify({ msg: "Failed to delete level", status: "error" });
        return false;
    }
}

export async function fetchCategories() {
    try {
        const { data } = await quantumClient().get("/org/levels/categories");
        return data.categories;
    } catch (e) {}
    return [];
}

export async function fetchFunctions(orgId: string) {
    try {
        const { data } = await quantumClient().get(`/org/${orgId}/functions`);
        return data.functions;
    } catch (error) {
        window.notify({ msg: "Function not fetched", status: "error" });
    }
}

export async function deleteFunction(id: string) {
    try {
        await quantumClient().delete(`/org/functions/${id}`);
        return true;
    } catch (error) {
        window.notify({ status: "error", msg: "Function not deleted" });
        return false;
    }
}

export async function fetchDesignations(orgId: string) {
    try {
        const { data } = await quantumClient().get(`/org/${orgId}/designations`);
        return data.designations;
    } catch (error) {
        window.notify({ msg: "Failed to fetch designations", status: "error" });
    }
}

export async function deleteDesignation(id: string) {
    try {
        await quantumClient().delete("/org/designations/", [id]);
        return true;
    } catch (error) {
        window.notify({ status: "error", msg: "Designation not deleted" });
        return false;
    }
}
