import { JSONClient } from "@/lib/http";
import localstore from "./localstore";
import store from "@/store";

const authToken = (): string =>
  store.state.user.authToken || localstore.get("authToken");

export const quantumClient = () =>
  new JSONClient(
    {
      "Content-Type": "application/json",
      Authorization: authToken(),
    },
    "http://18.132.188.41:7000"
  );

const cornieUrl = "https://dev.corniehealth.com";
const cornieUrl2 = "https://dev.corniehealth.com"

export const cornieClient = () =>
  new JSONClient(
    {
      "Content-Type": "application/json",
      Authorization: authToken(),
    },
    cornieUrl
  );

export const cornieClient2 = () =>
  new JSONClient(
    {
      "Content-Type": "application/json",
      Authorization: authToken(),
    },
    cornieUrl2
  );
