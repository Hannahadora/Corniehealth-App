import { IndexableObject } from "@/lib/http";

const isObj = (val: any) => val.constructor.name === "Object";

export function flatten(data: any) {
  let result = {} as IndexableObject;
  Object.entries(data).forEach(([key, val]) => {
    if (isObj(val)) {
      result = { ...result, ...flatten(val) };
    } else {
      if (key) result[key] = val;
    }
  });
  return result;
}
