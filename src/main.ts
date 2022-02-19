import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./index.css";
import { registerGlobalComponents } from "./components/globals";
import "./middlewares";

import VCalendar from "v-calendar";

const app = createApp(App).use(router).use(store).use(VCalendar, {});

registerGlobalComponents(app);

app.mount("#app");
