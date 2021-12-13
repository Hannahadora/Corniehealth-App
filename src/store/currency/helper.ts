import { cornieClient } from "@/plugins/http"
import ICurrency from "@/types/ICurrency"

export async function fetchCurrencys() {
    try {
        const response = await cornieClient().get(
            "/api/v1/currency/myOrg/conversions"
        )
        if (response.success) return response.data
    } catch (error) {

    }
    return [] as ICurrency[]
}
export async function deleteCurrency(id: string) {
    try {
        const response = await cornieClient().delete(`/api/v1/currency/${id}`)
        if (response.success) return true
    } catch (error) {
        return false
    }
    return false
}
