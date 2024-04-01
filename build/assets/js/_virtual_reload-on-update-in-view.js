const LOCAL_RELOAD_SOCKET_PORT = 8081;
const LOCAL_RELOAD_SOCKET_URL = `ws://localhost:${LOCAL_RELOAD_SOCKET_PORT}`;
class MessageInterpreter {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
  }
  static send(message) {
    return JSON.stringify(message);
  }
  static receive(serializedMessage) {
    return JSON.parse(serializedMessage);
  }
}
function _optionalChain(ops) {
  let lastAccessLHS = void 0;
  let value = ops[0];
  let i = 1;
  while (i < ops.length) {
    const op = ops[i];
    const fn = ops[i + 1];
    i += 2;
    if ((op === "optionalAccess" || op === "optionalCall") && value == null) {
      return void 0;
    }
    if (op === "access" || op === "optionalAccess") {
      lastAccessLHS = value;
      value = fn(value);
    } else if (op === "call" || op === "optionalCall") {
      value = fn((...args) => value.call(lastAccessLHS, ...args));
      lastAccessLHS = void 0;
    }
  }
  return value;
}
let needToUpdate = false;
function initReloadClient({
  watchPath,
  onUpdate,
  onForceReload
}) {
  const socket = new WebSocket(LOCAL_RELOAD_SOCKET_URL);
  function sendUpdateCompleteMessage() {
    socket.send(MessageInterpreter.send({ type: "done_update" }));
  }
  socket.addEventListener("message", (event) => {
    const message = MessageInterpreter.receive(String(event.data));
    switch (message.type) {
      case "do_update": {
        if (needToUpdate) {
          sendUpdateCompleteMessage();
          needToUpdate = false;
          onUpdate();
        }
        return;
      }
      case "wait_update": {
        if (!needToUpdate) {
          needToUpdate = message.path.includes(watchPath);
        }
        return;
      }
      case "force_reload": {
        _optionalChain([onForceReload, "optionalCall", (_) => _()]);
        return;
      }
    }
  });
  socket.onclose = () => {
    console.log(
      `Reload server disconnected.
Please check if the WebSocket server is running properly on ${LOCAL_RELOAD_SOCKET_URL}. This feature detects changes in the code and helps the browser to reload the extension or refresh the current tab.`
    );
    setTimeout(() => {
      initReloadClient({ watchPath, onUpdate });
    }, 1e3);
  };
  return socket;
}
function addHmrIntoView(watchPath) {
  let pendingReload = false;
  initReloadClient({
    watchPath,
    onUpdate: () => {
      if (document.hidden) {
        pendingReload = true;
        return;
      }
      reload();
    }
  });
  function reload() {
    pendingReload = false;
    window.location.reload();
  }
  function reloadWhenTabIsVisible() {
    !document.hidden && pendingReload && reload();
  }
  document.addEventListener("visibilitychange", reloadWhenTabIsVisible);
}
export {
  addHmrIntoView as a
};
