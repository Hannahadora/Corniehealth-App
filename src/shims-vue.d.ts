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

import { ChartTypeRegistry } from "chart.js";

declare module "chart.js" {
  interface ChartTypeRegistry {
    derivedDoughnut: ChartTypeRegistry["doughnut"];
  }

  interface ElementOptionsByType<TType extends ChartType> {
    center: {
      text: string;
      color: string;
      fontStyle: string;
      sidePadding: number;
      minFontSize: number;
      lineHeight: number;
    };
  }
}

declare global {
  interface Window {
    confirmAction(setUp?: ConfirmSetup): Promise<boolean>;
    notify(data: INotify): void;
  }

  interface INotify {
    msg: string;
    status?: "success" | "error" | "info";
    title?: string;
  }
  declare function notify(data: INotify): void;
  declare function confirmAction(setUp?: ConfirmSetup): Promise<boolean>;

  declare module "@scelloo/cloudenly-ui/*";
  declare module "v-calendar";
  declare module "vue-select-connorshea";
}
