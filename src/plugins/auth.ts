import store from "@/store";
import { quantumClient } from "./http";
import localstore from "./localstore";

export function rememberLogin(token: string) {
  localstore.put("authToken", token, 2);
  startTokenRefresher(900);
}

export async function isLoggedIn() {
  const token = getStoreToken() ?? localstore.get("authToken");
  return Boolean(token);
}

export async function refreshUser() {
  const user = store.state.user.user;
  if (user?.id) return;
  const data = await fetchUserData();
  store.commit("user/setLoginInfo", data);
}

async function fetchUserData() {
  try {
    const response = await quantumClient().get("auth/refresh_linchpin");
    return response;
  } catch (error) {
    console.log("error");
  }
}
export async function logout() {
  clearInterval(interval);
  localstore.remove("authToken");
  store.commit("user/setAuthToken", "");
}

let interval: number | undefined;
export function startTokenRefresher(expiryInMins: number) {
  if (interval) return;
  const expiryInMilliSecs = expiryInMins * 60 * 1000;
  interval = setInterval(refreshToken, expiryInMilliSecs);
}

async function refreshToken() {
  if (!isLoggedIn()) return;
  const client = quantumClient();
  try {
    const data = await client.post("/auth/refresh-token", {});
    if (!data.success) return;
    const token = data.token;
    store.commit("user/setAuthToken", token);
  } catch (error) {
    console.log("Token refresh failed");
  }
}

function daysBetweenDates(start: Date, end: Date) {
  const diffInMillisecs = end.getTime() - start.getTime();
  return diffInMillisecs / (1000 * 3600 * 24);
}

function getStoreToken() {
  const authTime = store.state.user.authTime;
  const authToken = store.state.user.authToken;
  if (!authTime || !authToken) return;
  if (daysBetweenDates(authTime, new Date()) > 2) return;
  return authToken;
}
