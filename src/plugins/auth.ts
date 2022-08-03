import store from "@/store";
import { AuthPayload, UserType } from "@/types/auth";
import { cornieClient, quantumClient } from "./http";
import localstore from "./localstore";

export function rememberLogin(token: string) {
  localstore.put("authToken", token, 2);
  startTokenRefresher(900);
}

export async function isLoggedIn() {
  const token = getStoreToken() ?? localstore.get("authToken");
  return Boolean(token);
}

export async function login(payload: AuthPayload) {
  sessionStorage.clear();
  const data = await quantumClient().post("/auth/login", payload);
  store.commit("user/setLoginInfo", data.data);
  const cornieData = await fetchCornieData();

  store.commit("user/setCornieData", cornieData);
  return data;
}

export async function getAccountType() {
  let type: string =
    store.getters["user/accountType"] ?? getSessionData("accountType");

  if (!type) {
    const { user } = await fetchCornieData();
    type = user?.accountType?.toLowerCase();
    setSessionData("accountType", type);
  }
  return type as UserType;
}

function setSessionData(key: string, val: string) {
  try {
    sessionStorage.setItem(key, val);
  } catch (error) {
    return; // user has disabled session storage
  }
}

function getSessionData(key: string) {
  return sessionStorage.getItem(key);
}

export async function refreshUser() {
  const user = store.state.user.user;
  if (user?.id) return;
  const data = await fetchUserData();

  if (!data) return;
  store.commit("user/setLoginInfo", data.quantum);
  store.commit("user/setCornieData", data.cornie);
}

async function fetchUserData() {
  try {
    const quantumResponse = quantumClient().get("auth/refresh_linchpin");
    const cornieResponse = fetchCornieData();
    const [quantum, cornie] = await Promise.all([
      quantumResponse,
      cornieResponse,
    ]);
    return { quantum: quantum.data, cornie };
  } catch (error) {}
}

export async function fetchCornieData() {
  try {
    const res = await cornieClient().get("/api/v1/account");
    return res.success ? res.data : {};
  } catch (error) {}
  return {};
}

export async function logout() {
  clearInterval(interval);
  localstore.remove("authToken");
  sessionStorage.clear();
  store.commit("user/setAuthToken", "");
  localstore.remove("authDomain");
  store.commit("user/setAuthDomain", "");
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
  } catch (error) {}
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

export function setAuthDomain(domain: string) {
  store.commit("user/setAuthDomain", domain);
  localstore.put("authDomain", domain, 3);
}

export function getAuthDomain() {
  return store.state.user.domain || localstore.get("authDomain");
}
