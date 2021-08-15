import { cornieClient } from "@/plugins/http";
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
      console.log(e);
      return {} as IFunction;
    }
  }
}
