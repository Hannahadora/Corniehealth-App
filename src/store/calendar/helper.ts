import { cornieClient } from "@/plugins/http";
import ICalendar from "@/types/ICalendar";

export async function fetchCalendars() {
    try {
        const response = await cornieClient().get(
            "/api/v1/calendar/findForUser/me"
        )

        if (response.success) {
            return response.data
        }
    } catch (error) {

    }
    return [] as ICalendar[]
}


