import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

console.log("root config");
System.get("@org/home-app");

// System.resolve("@org/home-app").catch((error) => {
//   console.error("Current Import Map:", System.getImportMap());
// });

function createDomElementForHomeApp() {
  if (!document.getElementById("home-app")) {
    console.log("creating div ele...");
    const el = document.createElement("div");
    el.id = "home-app";
    document.body.appendChild(el);
  }
}

createDomElementForHomeApp();

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    console.log("loading App...", name);
    return import(/* webpackIgnore: true */ name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();

// import { registerApplication, start } from "single-spa";
// import {
//   constructApplications,
//   constructRoutes,
//   constructLayoutEngine,
// } from "single-spa-layout";

// const routes = constructRoutes(document.querySelector("#single-spa-layout"));
// const applications = constructApplications({
//   routes,
//   loadApp({ name }) {
//     return System.import(name);
//   },
// });
// const layoutEngine = constructLayoutEngine({ routes, applications });

// applications.forEach(registerApplication);
// layoutEngine.activate();
// start();