import "@quasar/extras/material-icons-outlined/material-icons-outlined.css";
//import 'element-plus/dist/index.css'
// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";
import "element-plus/dist/index.css";
import { AppFullscreen, Dialog, Quasar } from "quasar";
// Import Quasar css
import "quasar/src/css/index.sass";
import { createApp } from "vue";
import VueCookies from "vue-cookies";

import App from "./App.vue";
import router from "./router";
import pinia from "./stores";
import "./styles/app.sass";
import "./styles/index.scss";
import "./styles/theme.scss";

const app = createApp(App);
app.use(router).use(pinia);
app.use(Quasar, {
  plugins: { AppFullscreen, Dialog },
  config: {},
});
app.use(VueCookies, { expires: "7d" });

app.mount("#app");
