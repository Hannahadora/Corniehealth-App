/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ConfirmSetup {
  message: string;
  yes: string;
  no: string;
  title: string;
}
declare function confirmAction(setUp?: ConfirmSetup): Promise<boolean>;

declare module "@scelloo/cloudenly-ui/*";

interface Window {
  confirmAction(setUp?: ConfirmSetup): Promise<boolean>;
}
