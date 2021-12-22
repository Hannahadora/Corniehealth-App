import { getAccountType } from "@/plugins/auth";
import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";

export async function redirector(
    to: RouteLocationNormalized,
    _: RouteLocationNormalized,
    next: NavigationGuardNext
) {
    if (!to.path.includes("dashboard")) return next();
    const accountType = await getAccountType();
    if (!accountType) return next({ path: "/signin" });
    const expectedPath = `/dashboard/${accountType}`.toLowerCase();
    if (to.path.includes(expectedPath)) return next();
    const newPath = to.path.replace("/dashboard", expectedPath);
    next({ path: newPath });
}
