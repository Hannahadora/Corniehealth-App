import { suggester } from "@/plugins/route-suggester";
import { RouteLocationNormalized } from "vue-router";

export async function remeberSettings(
  to: RouteLocationNormalized,
  _: RouteLocationNormalized,
  __: any
) {
  if (!to.matched.some(record => record.meta.settings)) return;
  if (!to.name) return;
  suggester.rememberRoute(to.fullPath, to.name as string);
  // eslint-disable-next-line no-console
  console.log("Remembering this ", to.fullPath, to.name);
}
