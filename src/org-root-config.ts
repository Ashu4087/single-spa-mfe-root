import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return import(/* webpackIgnore: true */ name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();


// function createDomElementForHomeApp() {
//   if (!document.getElementById("home-app")) {
//     const el = document.createElement("div");
//     el.id = "home-app";
//     document.body.appendChild(el);
//   }
// }

// registerApplication({
//   name: "@org/home-app",
//   app: () => {
//     createDomElementForHomeApp();
//     return System.import("@org/home-app");
//   },
//   activeWhen: ["/home"],
// });

// start();
