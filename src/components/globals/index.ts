import { App } from "vue";
import CornieBtn from "./corniebtn.vue";
import { Form } from "vee-validate";

export const registerGlobalComponents = (app: App) => {
  app.component("CornieBtn", CornieBtn);
  app.component("VForm", Form);
};
