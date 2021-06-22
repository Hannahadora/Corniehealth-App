import { JSONClient } from "@/lib/http";
import store from "@/store";

let interval: number | undefined;

const storeAuthToken = (): string => store.state.user.authToken;

async function refreshToken() {
  if (!storeAuthToken()) return;
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

export function startRefresher(expiryInMins: number) {
  const expiryInMilliSecs = expiryInMins * 60 * 1000;
  clearInterval(interval);
  interval = setInterval(refreshToken, expiryInMilliSecs);
}

export const stopRefresher = () => clearInterval(interval);

export const quantumClient = () =>
  new JSONClient(
    {
      "Content-Type": "application/json",
      Authorization: storeAuthToken(),
    },
    "http://18.132.188.41:7000"
  );

export const cornieClient = () =>
  new JSONClient({
    "Content-Type": "application/json",
    Authorization: storeAuthToken(),
  });
