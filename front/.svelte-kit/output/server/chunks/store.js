import { w as writable } from "./index2.js";
var stores = {
  local: {},
  session: {}
};
function getStorage(type) {
  return type === "local" ? localStorage : sessionStorage;
}
function persisted(key, initialValue, options) {
  var _a, _b, _c, _d, _e, _f;
  const serializer = (_a = void 0) != null ? _a : JSON;
  const storageType = (_b = void 0) != null ? _b : "local";
  const syncTabs = (_c = void 0) != null ? _c : true;
  const onWriteError = (_e = (_d = void 0) != null ? _d : void 0) != null ? _e : (e) => console.error(`Error when writing value from persisted store "${key}" to ${storageType}`, e);
  const onParseError = (_f = void 0) != null ? _f : (newVal, e) => console.error(`Error when parsing ${newVal ? '"' + newVal + '"' : "value"} from persisted store "${key}"`, e);
  const browser = typeof window !== "undefined" && typeof document !== "undefined";
  const storage = browser ? getStorage(storageType) : null;
  function updateStorage(key2, value) {
    try {
      storage == null ? void 0 : storage.setItem(key2, serializer.stringify(value));
    } catch (e) {
      onWriteError(e);
    }
  }
  function maybeLoadInitial() {
    const json = storage == null ? void 0 : storage.getItem(key);
    if (json) {
      try {
        return serializer.parse(json);
      } catch (e) {
        onParseError(json, e);
      }
    }
    return initialValue;
  }
  if (!stores[storageType][key]) {
    const initial = maybeLoadInitial();
    const store = writable(initial, (set2) => {
      if (browser && storageType == "local" && syncTabs) {
        const handleStorage = (event) => {
          if (event.key === key) {
            let newVal;
            try {
              newVal = event.newValue ? serializer.parse(event.newValue) : null;
            } catch (e) {
              onParseError(event.newValue, e);
              return;
            }
            set2(newVal);
          }
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
      }
    });
    const { subscribe, set } = store;
    stores[storageType][key] = {
      set(value) {
        set(value);
        updateStorage(key, value);
      },
      update(callback) {
        return store.update((last) => {
          const value = callback(last);
          updateStorage(key, value);
          return value;
        });
      },
      subscribe
    };
  }
  return stores[storageType][key];
}
const userInfo = persisted("userInfo", writable());
const userSets = writable([]);
export {
  userInfo as a,
  userSets as u
};
