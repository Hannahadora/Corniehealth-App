import { cornieClient } from "@/plugins/http";
import IAppointmentRoom from "@/types/IAppointmentRoom";

export async function fetchAppointmentrooms() {
    try {
        const response = await cornieClient().get("/api/v1/appointment-rooms");
        if (response.success) {
            return response.data;
        }
    } catch (error) {}
    return [] as IAppointmentRoom[];
}
export async function deleteAppointmentroom(id: string) {
    try {
        const response = await cornieClient().delete(
            `/api/v1/appointment-rooms/${id}`
        );
        if (response.success) {
            return true;
        }
    } catch (error) {
        return false;
    }
    return false;
}
