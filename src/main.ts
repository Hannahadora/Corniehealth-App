import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./index.css";
import { registerGlobalComponents } from "./components/globals";
import "./middlewares";
import "vue3-date-time-picker/dist/main.css"
import "v-calendar/dist/style.css";
import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css";
import VCalendar from "v-calendar";

const app = createApp(App).use(router).use(store).use(VCalendar, {});

registerGlobalComponents(app);

app.mount("#app");
