import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import http from "./http";
import ConversionTime from "./plugins/conversion-time";
import ConversionCurrency from "./plugins/conversion-currency";

import "./assets/sass/app.scss";

Vue.config.productionTip = false;

Vue.use(ConversionTime);
Vue.use(ConversionCurrency);

new Vue({
  router,
  store,
  http,
  render: h => h(App)
}).$mount("#app");
