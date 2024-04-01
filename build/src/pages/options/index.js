import { j as jsxRuntimeExports, c as createRoot } from "../../../assets/js/client.js";
import { a as addHmrIntoView } from "../../../assets/js/_virtual_reload-on-update-in-view.js";
const Options = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container", children: "Options" });
};
addHmrIntoView("pages/options");
function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find #app-container");
  }
  const root = createRoot(appContainer);
  root.render(/* @__PURE__ */ jsxRuntimeExports.jsx(Options, {}));
}
init();
