import { suggester } from "@/plugins/route-suggester";
import { RouteLocationNormalized } from "vue-router";

export async function remeberSettings(
  to: RouteLocationNormalized,
  _: RouteLocationNormalized,
  __: any
) {
  if (!to.matched.some((record) => record.meta.settings)) return;
  if (!to.name) return;
  const { type, ...rest } = to.params;
  if (rest && Object.entries(rest).length > 0) {
    return;
  }
  suggester.rememberRoute(to.fullPath, to.name as string);
}
