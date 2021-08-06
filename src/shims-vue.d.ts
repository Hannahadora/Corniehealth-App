/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ConfirmSetup {
  message?: string;
  yes?: string;
  no?: string;
  title?: string;
}

interface INotify {
  msg: string;
  status?: "success" | "error" | "info";
}

declare function notify(data: INotify): void;
declare function confirmAction(setUp?: ConfirmSetup): Promise<boolean>;

declare module "@scelloo/cloudenly-ui/*";
declare module "v-calendar";
declare module "vue-select-connorshea";

interface Window {
  confirmAction(setUp?: ConfirmSetup): Promise<boolean>;
  notify(data: INotify): void;
}
