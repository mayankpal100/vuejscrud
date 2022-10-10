import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVue from 'bootstrap-vue-3'
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-vue/dist/bootstrap-vue.css";

const app = createApp(App);

app.use(router);

app.use(BootstrapVue);

app.mount("#app");
