import { r as reactExports, j as jsxRuntimeExports, c as createRoot } from "./client.js";
import { a as addHmrIntoView } from "./_virtual_reload-on-update-in-view.js";
function App() {
  reactExports.useEffect(() => {
    console.log("content view loaded");
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "", children: "content view" });
}
const injectedStyle = "";
addHmrIntoView("pages/content");
const root = document.createElement("div");
root.id = "chrome-extension-boilerplate-react-vite-content-view-root";
document.body.append(root);
const rootIntoShadow = document.createElement("div");
rootIntoShadow.id = "shadow-root";
const shadowRoot = root.attachShadow({ mode: "open" });
shadowRoot.appendChild(rootIntoShadow);
const styleElement = document.createElement("style");
styleElement.innerHTML = injectedStyle;
shadowRoot.appendChild(styleElement);
createRoot(rootIntoShadow).render(/* @__PURE__ */ jsxRuntimeExports.jsx(App, {}));
