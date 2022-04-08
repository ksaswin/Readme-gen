import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import copyText from "@meforma/vue-copy-to-clipboard";

createApp(App).use(copyText).use(router).mount("#app");
