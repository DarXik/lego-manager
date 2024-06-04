import { g as getContext, c as create_ssr_component, a as subscribe, e as escape } from "../../chunks/ssr.js";
import "../../chunks/client.js";
/* empty css               */
const getStores = () => {
  const stores = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
const Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-1mxdmh2_START -->${$$result.title = `<title>Error ${escape($page.status)}</title>`, ""}<!-- HEAD_svelte-1mxdmh2_END -->`, ""} <main class="min-h-screen flex items-center justify-center no-un"><div class="bg-gray-950 border border-transparent shadow-lg p-8 px-16 flex items-center justify-center flex-col">${$page.status === 404 ? `<img class="w-80 mb-4" src="../../error/error404.png" alt="error"> <h1 class="text-3xl font-bold" data-svelte-h="svelte-1wwpu43">Requested page not found</h1> <p class="text-gray-400 mt-1" data-svelte-h="svelte-6rdzjp">You can try again or return to the homepage</p> <button class="mt-8 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75 disabled:pointer-events-none disabled:cursor-not-allowed" data-svelte-h="svelte-17fjpsy"><a href="/">GO HOME</a></button>` : `<h1 class="text-3xl font-bold" data-svelte-h="svelte-18wybro">Your request failed</h1> <p class="text-gray-400 mt-1" data-svelte-h="svelte-6rdzjp">You can try again or return to the homepage</p> <div class="flex mt-8 gap-8" data-svelte-h="svelte-17omwom"><button class="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75 disabled:pointer-events-none disabled:cursor-not-allowed "><a href="/">GO HOME</a></button> </div>`}</div></main>`;
});
export {
  Error$1 as default
};
