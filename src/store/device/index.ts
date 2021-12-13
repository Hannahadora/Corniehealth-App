import { IndexableObject } from "@/lib/http"
import ObjectSet from "@/lib/objectset"
import IDevice from "@/types/IDevice"
import { StoreOptions } from "vuex"
import { deleteDevice, fetchDevices, fetchDropDowns } from "./helper"

interface DeviceState {
  devices: IDevice[];
  dropdownData: IndexableObject;
}

export default {
    namespaced: true,
    state: {
        devices: [] as IDevice[],
        dropdownData: {} as IIndexableObject,
    },
    getters: {},
    mutations: {
        setDropdownData(state, data) {
            state.dropdownData = { ...data }
        },
        updateDevices(state, devices: IDevice[]) {
            const deviceSet = new ObjectSet([...state.devices, ...devices], "id")

            state.devices = [...deviceSet]
        },
        deleteDevice(state, id: string) {
            state.devices = state.devices.filter(device => device.id != id)
        },
    },
    actions: {
        async fetchDevices(ctx) {
            const devices = await fetchDevices()
            ctx.commit("updateDevices", devices)
        },
        async fetchDropdownData(ctx) {
            const dropdowns = await fetchDropDowns()
            ctx.commit("setDropdownData", dropdowns)
        },
        async deleteDevice(ctx, id: string) {
            const deleted = await deleteDevice(id)
            if (!deleted) return false
            ctx.commit("deleteDevice", id)
            return true
        },
    },
} as StoreOptions<DeviceState>
