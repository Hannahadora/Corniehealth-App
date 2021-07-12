import { isLoggedIn, startTokenRefresher, refreshUser } from "@/plugins/auth";
import store from "@/store";
import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";

export async function redirector(
  to: RouteLocationNormalized,
  _: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  if (!to.path.includes("dashboard")) return next();
  const accountType = store.state.user.cornieData.accountType || "Provider";
  const expectedPath = `/dashboard/${accountType}`.toLowerCase();
  if (to.path.includes(expectedPath)) return next();
  const newPath = to.path.replace("/dashboard", expectedPath);
  next({ path: newPath });
}
