import { isLoggedIn, startRefresher } from "@/plugins/auth";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export async function authMiddleware(
  to: RouteLocationNormalized,
  _: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  if (!to.matched.some((record) => record.meta.requiresAuth)) return next();
  if (await isLoggedIn()) {
    startRefresher(900);
    next();
  } else {
    next({
      path: "/signin",
    });
  }
}
