import {
  isLoggedIn,
  startTokenRefresher,
  refreshUser,
  fetchCornieData,
} from "@/plugins/auth";
import store from "@/store";
import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";

async function accType() {
  let type = store.state.user.cornieData.accountType;
  if (!type) {
    const user = await fetchCornieData();
    type = user.accountType;
  }
  return type;
}
export async function redirector(
  to: RouteLocationNormalized,
  _: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  if (!to.path.includes("dashboard")) return next();
  const accountType = await accType();
  const expectedPath = `/dashboard/${accountType}`.toLowerCase();
  if (to.path.includes(expectedPath)) return next();
  const newPath = to.path.replace("/dashboard", expectedPath);
  next({ path: newPath });
}
