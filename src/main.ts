//Import v-md-editor
import VMdEditor from "@kangc/v-md-editor/lib/codemirror-editor";
import "@kangc/v-md-editor/lib/style/codemirror-editor.css";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";
import "@quasar/extras/material-icons-outlined/material-icons-outlined.css";
//import 'element-plus/dist/index.css'
// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";
// codemirror 编辑器的相关资源
import Codemirror from "codemirror";
// placeholder
import "codemirror/addon/display/placeholder";
// edit
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/matchbrackets";
// scrollbar
import "codemirror/addon/scroll/simplescrollbars";
import "codemirror/addon/scroll/simplescrollbars.css";
// active-line
import "codemirror/addon/selection/active-line";
// style
import "codemirror/lib/codemirror.css";
import "codemirror/mode/css/css";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/javascript/javascript";
// mode
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/vue/vue";
import "element-plus/dist/index.css";
// highlightjs
import hljs from "highlight.js";
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

VMdEditor.Codemirror = Codemirror;
VMdEditor.use(githubTheme, {
  Hljs: hljs,
});

const app = createApp(App);
app.use(router).use(pinia);
app.use(Quasar, {
  plugins: { AppFullscreen, Dialog },
  config: {},
});
app.use(VueCookies, { expires: "7d" });
app.use(VMdEditor);

app.mount("#app");
