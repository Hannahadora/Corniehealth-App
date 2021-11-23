import { cornieClient } from "@/plugins/http";
import IAppointmentTypes from "@/types/IAppointmentTypes";

export async function getappointmentTypes() {
    try {
        const response = await cornieClient().get(`/api/v1/catalogue-service/fees`);
        if (response.success) {
          return response.data;
        }
      } catch (error) {
        console.log(error);
      }
        return [] as IAppointmentTypes[];
}

// export async function getappointmentTypes() {
//     try {
//       const response = await cornieClient().get(`/api/v1/catalogue-service/fees`);
  
//       return response.data;
//     } catch (error) {
//       notify({ msg: "There was an error loading ", status: "error" });
//     }
//     return {};
//   }