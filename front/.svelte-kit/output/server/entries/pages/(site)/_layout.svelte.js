import { c as create_ssr_component, b as add_attribute, d as subscribe, v as validate_component, a as escape } from "../../../chunks/ssr.js";
/* empty css                  */
import { w as writable } from "../../../chunks/index.js";
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<nav class="fixed md:hidden z-30 top-0 w-full bg-black h-20 border-gray-600"><div class="flex justify-between items-center px-3 h-full"><a href="/" title="home" data-svelte-h="svelte-x2bqpc"><img src="../../../../navbar/lego-logo.svg" alt="lego logo" class="w-12 h-12 transition-all active:scale-90"></a> <button data-svelte-h="svelte-ibjkmq"><img src="../../../../navbar/hamburger.svg" alt="hamburger" class="w-12 h-12 md:hidden"></button></div></nav> ${``} <nav class="md:h-screen max-md:hidden fixed z-20 top-0 w-full md:w-24 bg-gray-950 border-r-[3px] border-zinc-600 flex flex-row md:flex-col justify-between py-6"><div><div class="md:pb-6 px-6 md:border-b-3 border-zinc-600 items-center" data-svelte-h="svelte-qzpb80"><a href="/" title="home"><img src="../../../../navbar/lego-logo.svg" alt="lego logo" class="w-12 h-12 transition-all active:scale-90"></a></div> <div class="hidden md:visible md:flex flex-col items-center py-6 px-6 gap-y-6"><a title="account" href="/account" class="active:scale-90 transition-all"><svg class="w-9 h-9 transition-all" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="transition-all" cx="12" cy="9" r="3"${add_attribute("stroke", "#e4e4e7", 0)} stroke-width="1.5"></circle><circle class="transition-all" cx="12" cy="12" r="10"${add_attribute("stroke", "#e4e4e7", 0)} stroke-width="1.5"></circle><path class="transition-all" d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"${add_attribute("stroke", "#e4e4e7", 0)} stroke-width="1.5" stroke-linecap="round"></path></svg></a> <a title="add new set" href="/add-set" class="active:scale-90 transition-all"><svg class="w-9 h-9 transition-all" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="transition-all" d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"${add_attribute("stroke", "#e4e4e7", 0)} stroke-width="1.5"></path><path class="transition-all" d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"${add_attribute("stroke", "#e4e4e7", 0)} stroke-width="1.5" stroke-linecap="round"></path></svg></a></div></div> <div class="hidden md:visible md:flex flex-col gap-y-3 items-center border-t-[3px] border-zinc-600 pt-6"><a title="settings" href="/settings" data-svelte-h="svelte-xy8bhi"><img src="../../../../navbar/settings.svg" alt="settings" class="w-7 h-7 hover:rotate-45 transition-all active:scale-90"></a> <button title="logout" data-svelte-h="svelte-1u96x4l"><img src="../../../../navbar/logout.svg" alt="logout" class="w-8 h-8 hover:translate-x-1 transition-all active:scale-90"></button></div></nav>`;
});
var stores = {
  local: {},
  session: {}
};
function getStorage(type) {
  return type === "local" ? localStorage : sessionStorage;
}
function persisted(key, initialValue, options) {
  var _a, _b, _c, _d;
  const serializer = (_a = options == null ? void 0 : options.serializer) != null ? _a : JSON;
  const storageType = (_b = options == null ? void 0 : options.storage) != null ? _b : "local";
  const syncTabs = (_c = options == null ? void 0 : options.syncTabs) != null ? _c : true;
  const onError = (_d = options == null ? void 0 : options.onError) != null ? _d : (e) => console.error(`Error when writing value from persisted store "${key}" to ${storageType}`, e);
  const browser = typeof window !== "undefined" && typeof document !== "undefined";
  const storage = browser ? getStorage(storageType) : null;
  function updateStorage(key2, value) {
    try {
      storage == null ? void 0 : storage.setItem(key2, serializer.stringify(value));
    } catch (e) {
      onError(e);
    }
  }
  function maybeLoadInitial() {
    const json = storage == null ? void 0 : storage.getItem(key);
    if (json) {
      return serializer.parse(json);
    }
    return initialValue;
  }
  if (!stores[storageType][key]) {
    const initial = maybeLoadInitial();
    const store = writable(initial, (set2) => {
      if (browser && storageType == "local" && syncTabs) {
        const handleStorage = (event) => {
          if (event.key === key)
            set2(event.newValue ? serializer.parse(event.newValue) : null);
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
      }
    });
    const { subscribe: subscribe2, set } = store;
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
      subscribe: subscribe2
    };
  }
  return stores[storageType][key];
}
persisted("userInfo", writable());
const userSets = writable([]);
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_userSets;
  $$unsubscribe_userSets = subscribe(userSets, (value) => value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  {
    console.log(data);
  }
  $$unsubscribe_userSets();
  return `${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})} <main class="md:ml-24 max-md:mt-20 min-h-screen"><div class="border-b-3 border-zinc-600 p-4 px-6 max-md:hidden"><p class="text-2xl"><span class="text-base text-gray-500" data-svelte-h="svelte-1wgffma">logged in as</span> ${escape(data.username ? data.username : "--")}</p></div> ${slots.default ? slots.default({}) : ``}</main> <footer class="w-full border-main py-2 md:py-4 px-12 flex flex-row justify-end bg-gray-950"><div class="md:ml-24 flex md:flex-row flex-col max-md:text-center justify-between items-center w-full max-md:text-sm"><small data-svelte-h="svelte-rggcs1"><p class="md:text-start w-full">Version: 1.0</p></small> <small><p class="md:text-end w-full">© ${escape((/* @__PURE__ */ new Date()).getFullYear())} | Made by David Pitra</p> </small></div></footer>`;
});
export {
  Layout as default
};
