import { cornieClient } from "@/plugins/http"
import ICollection from "@/types/ICollection"

export async function fetchCollectionAccounts(orgId:string) {
    try {
        const response = await cornieClient().get(`/api/v1/collection/account/getAllByOrg/${orgId}`)
        return response.data as ICollection[]
    } catch (error) {
        notify({ msg: "There was an error fetching collection account", status: "error" })
    }
    return []
}

export async function deleteCollectionAccount(id: string) {
    try {
        const response = await cornieClient().delete(`/api/v1/collection/account/${id}`)
        return response.data as ICollection[]
    } catch (error) {
        notify({
            msg: "There was an error deleting this collection account",
            status: "error",
        })
    }
}
