import { App } from "vue";
import CornieBtn from "./corniebtn.vue";

export const registerGlobalComponents = (app: App) => {
  app.component("CornieBtn", CornieBtn);
};
