import { App } from "vue";

import { Form } from "vee-validate";
import CornieBtn from "@/components/CornieBtn.vue";
export const registerGlobalComponents = (app: App) => {
  app.component("CornieBtn", CornieBtn);
  app.component("VForm", Form);
};
