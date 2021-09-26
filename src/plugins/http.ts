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

const cornieUrl =
  // process.env.NODE_env == "production"
  //   ? "https://corniehealth.herokuapp.com"
  //   : "http://localhost:7000";
  "http://localhost:7000";

export const cornieClient = () =>
  new JSONClient(
    {
      "Content-Type": "application/json",
      Authorization: authToken(),
    },
    cornieUrl
  );
