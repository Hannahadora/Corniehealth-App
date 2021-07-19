import { IndexableObject } from "@/lib/http";
import ObjectSet from "@/lib/objectset";
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
    setDropdownData(state, data) {
      state.dropdownData = { ...data };
    },
    updateDevices(state, devices: IDevice[]) {
      const deviceSet = new ObjectSet([...state.devices, ...devices], "id");

      state.devices = [...deviceSet];
    },
  },
  actions: {
    async fetchDevices() {
      const devices = await fetchDevices();
      this.commit("device/updateDevices", devices);
    },
    async fetchDropdownData() {
      const dropdowns = await fetchDropDowns();
      this.commit("device/setDropdownData", dropdowns);
    },
  },
} as StoreOptions<DeviceState>;
