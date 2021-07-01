import { IndexableObject } from "@/lib/http";
import { cornieClient } from "@/plugins/http";
import localstore from "@/plugins/localstore";
import IDevice from "@/types/IDevice";

export async function fetchDropDowns(): Promise<IndexableObject> {
  let dropdowns;
  dropdowns = fetchLocalDropdowns();
  if (dropdowns) return dropdowns;
  dropdowns = await fetchRemoteDropdowns();
  localstore.put("dropdowns", dropdowns);
  return dropdowns;
}

async function fetchRemoteDropdowns() {
  try {
    const resp = await cornieClient().get("/api/v1/devices/dropdowns");
    return resp.data;
  } catch (error) {
    console.log("there was an error");
  }
}

function fetchLocalDropdowns(): any {
  return localstore.get("dropdowns");
}

export async function fetchDevices(): Promise<IDevice[]> {
  try {
    const res = await cornieClient().get("/api/v1/devices/read");
    return res.data.devices as IDevice[];
  } catch (error) {
    console.log("there was an error");
  }
  return [];
}
