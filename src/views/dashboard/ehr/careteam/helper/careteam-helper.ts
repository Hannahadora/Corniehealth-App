import { cornieClient } from "@/plugins/http"
import ICareteam from "@/types/ICareteam"

export interface Item {
	code: string;
	display: string;
}

const createCareTeam = async (body: any) => {
    try {
        const { data } = await cornieClient().post("/api/v1/care-teams/", body)

        return data as ICareteam
    } catch (error) {

        window.notify({ msg: "Careteam not created", status: "error" })
    }
}

const editCareTeam = async (body: any, id: string) => {
    try {
        const { data } = await cornieClient().put(`/api/v1/care-teams/${id}`, body)

        return data as ICareteam
    } catch (error) {

        window.notify({ msg: "Update failed", status: "error" })
    }
}

const addToTeam = async (team: any) => {

    const practitioneData = {
        id: "87e846a3-bac0-43b9-a4db-0b2605426c42",
        name: "Darlington Onyemere",
    }

    try {
        const { data } = await cornieClient().post("/api/v1/participants/", {
            careTeamId: team.id,
            role: "practitioner",
            practitionerId: practitioneData.id,
            name: practitioneData.name,
            reasonCode: "109006 ",
        })
        if (data?.id)
            window.notify({
                msg: "Added to care team successfully",
                status: "success",
            })
        return data
    } catch (error) {

        window.notify({ msg: "Error adding to care team", status: "error" })
    }
}

const searchForCareTeam = async (body: any) => {
    try {
        const data = await cornieClient().get("/api/v1/care-teams/search", body)

        return data
    } catch (error) {

    }
}

const constructEditCareTeamPayload = (team: ICareteam) => {
    const { status, id, name, category, identifier, period, subject } = team
    return {
        status,
        id,
        name,
        category,
        identifier,
        period,
        subject,
    }
}

export default {
    createCareTeam,
    editCareTeam,
    searchForCareTeam,
    addToTeam,
    constructEditCareTeamPayload,
}
