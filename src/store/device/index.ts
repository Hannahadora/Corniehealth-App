import { IndexableObject } from "@/lib/http";
import IDevice from "@/types/IDevice";
import { StoreOptions } from "vuex";
import { fetchDevices, fetchDropDowns } from "./helper";

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
    setDevices(state, devices) {
      state.devices = [...devices];
    },
    setDropdownData(state, data) {
      state.dropdownData = { ...data };
    },
    updateDevices(state, devices: IDevice[]) {
      console.log("updating devices");
      const storedDevices = [...state.devices];
      devices.forEach((device) => {
        const index = storedDevices.findIndex((d) => d.id == device.id);
        if (index >= 0) storedDevices[index] = device;
        else storedDevices.push(device);
      });
      console.log(storedDevices);
      state.devices = [...storedDevices];
    },
  },
  actions: {
    async fetchDevices() {
      const devices = await fetchDevices();
      this.commit("device/setDevices", devices);
    },
    async fetchDropdownData() {
      const dropdowns = await fetchDropDowns();
      this.commit("device/setDropdownData", dropdowns);
    },
  },
} as StoreOptions<DeviceState>;
