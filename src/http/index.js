import Vue from "vue";
import VueResource from "vue-resource";
import services from "./http";

Vue.use(VueResource);

const http = Vue.http;

http.options.root = "http://localhost:4000";
Object.keys(services).map(service => {
  services[service] = Vue.resource("", {}, services[service]);
});

export { http };
export default services;
