var StorageType = /* @__PURE__ */ ((StorageType2) => {
  StorageType2["Local"] = "local";
  StorageType2["Sync"] = "sync";
  StorageType2["Managed"] = "managed";
  StorageType2["Session"] = "session";
  return StorageType2;
})(StorageType || {});
async function updateCache(valueOrUpdate, cache) {
  function isFunction(value) {
    return typeof value === "function";
  }
  function returnsPromise(func) {
    return func instanceof Promise;
  }
  if (isFunction(valueOrUpdate)) {
    if (returnsPromise(valueOrUpdate)) {
      return await valueOrUpdate(cache);
    } else {
      return valueOrUpdate(cache);
    }
  } else {
    return valueOrUpdate;
  }
}
let globalSessionAccessLevelFlag = false;
function checkStoragePermission(storageType) {
  if (chrome.storage[storageType] === void 0) {
    throw new Error(`Check your storage permission in manifest.json: ${storageType} is not defined`);
  }
}
function createStorage(key, fallback, config) {
  let cache = null;
  let listeners = [];
  const storageType = (config == null ? void 0 : config.storageType) ?? "local";
  const liveUpdate = (config == null ? void 0 : config.liveUpdate) ?? false;
  if (globalSessionAccessLevelFlag === false && storageType === "session" && (config == null ? void 0 : config.sessionAccessForContentScripts) === true) {
    checkStoragePermission(storageType);
    chrome.storage[storageType].setAccessLevel({
      accessLevel: "TRUSTED_AND_UNTRUSTED_CONTEXTS"
      /* ExtensionPagesAndContentScripts */
    });
    globalSessionAccessLevelFlag = true;
  }
  const _getDataFromStorage = async () => {
    checkStoragePermission(storageType);
    const value = await chrome.storage[storageType].get([key]);
    return value[key] ?? fallback;
  };
  const _emitChange = () => {
    listeners.forEach((listener) => listener());
  };
  const set = async (valueOrUpdate) => {
    cache = await updateCache(valueOrUpdate, cache);
    await chrome.storage[storageType].set({ [key]: cache });
    _emitChange();
  };
  const subscribe = (listener) => {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };
  const getSnapshot = () => {
    return cache;
  };
  _getDataFromStorage().then((data) => {
    cache = data;
    _emitChange();
  });
  async function _updateFromStorageOnChanged(changes) {
    if (changes[key] === void 0)
      return;
    const valueOrUpdate = changes[key].newValue;
    if (cache === valueOrUpdate)
      return;
    cache = await updateCache(valueOrUpdate, cache);
    _emitChange();
  }
  if (liveUpdate) {
    chrome.storage[storageType].onChanged.addListener(_updateFromStorageOnChanged);
  }
  return {
    get: _getDataFromStorage,
    set,
    getSnapshot,
    subscribe
  };
}
const storage = createStorage("theme-storage-key", "light", {
  storageType: StorageType.Local,
  liveUpdate: true
});
const exampleThemeStorage = {
  ...storage,
  // TODO: extends your own methods
  toggle: async () => {
    await storage.set((currentTheme) => {
      return currentTheme === "light" ? "dark" : "light";
    });
  }
};
export {
  exampleThemeStorage as e
};
