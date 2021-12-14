import { cornieClient } from "@/plugins/http"
import localstore from "@/plugins/localstore"

export const fetchDropdownData = async (name: string) => {
    const localData = fetchLocalData(name)
    if (Object.values(localData).length > 0) return localData
    return await fetchRemoteData(name)
}

const fetchLocalData = (name: string) => {
    const saved = localstore.get("dropdowns") || {}
    return saved[name] || {}
}

const fetchRemoteData = async (name: string) => {
    try {
        const response = await cornieClient().get("/api/v1/dropdown", { q: name })
        if (response.success) {
            const data = response?.data[name] || {}
            storeLocal({ [name]: data })
            return data
        }
    } catch (error) {
        alert("failed to fetch dropdown data")
        return {}
    }
}

const storeLocal = (data: IIndexableObject) => {
    let saved = localstore.get("dropdowns") || {}
    saved = { ...saved, ...data }
    localstore.put("dropdowns", saved, 20)
}
