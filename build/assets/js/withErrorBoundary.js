var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { j as jsxRuntimeExports, r as reactExports } from "./client.js";
function withSuspense(Component, SuspenseComponent) {
  return function WithSuspense(props) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: SuspenseComponent, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Component, { ...props }) });
  };
}
class ErrorBoundary extends reactExports.Component {
  constructor() {
    super(...arguments);
    __publicField(this, "state", { hasError: false });
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
function withErrorBoundary(Component2, ErrorComponent) {
  return function WithErrorBoundary(props) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { fallback: ErrorComponent, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Component2, { ...props }) });
  };
}
export {
  withSuspense as a,
  withErrorBoundary as w
};
