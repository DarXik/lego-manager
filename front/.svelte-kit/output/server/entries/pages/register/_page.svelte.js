import { c as create_ssr_component, a as escape, b as add_attribute } from "../../../chunks/ssr.js";
/* empty css                  */
import "devalue";
import { g as goto } from "../../../chunks/client.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form } = $$props;
  let { data } = $$props;
  let showPassword = false;
  let username = "";
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  {
    if (form?.status === 201) {
      setInterval(
        () => {
          goto();
        },
        1e3
      );
    } else if (form?.problem || form?.message && form?.status !== 201) {
      setTimeout(
        () => {
          form = null;
        },
        3e3
      );
    }
  }
  {
    if (form) {
      username = form?.username;
      console.log(username);
    }
  }
  return `<section class="flex items-center justify-center min-h-screen mx-10"><div class="${[
    "w-full max-w-md p-8 space-y-4 bg-gray-950 border border-transparent shadow-lg",
    form?.problem ? "border-red-500" : ""
  ].join(" ").trim()}"><h1 class="text-2xl font-semibold text-center" data-svelte-h="svelte-j8qtns">Register</h1> ${form?.status !== 201 && form?.message || form?.problem ? `<p class="text-lg text-center font-semibold error text-red-500">${escape(form?.message || form?.problem)}</p>` : ``} ${form?.status === 201 && form?.message ? `<p class="text-lg text-center font-semibold success text-green-500">${escape(form?.message)}</p>` : ``} <form method="POST" class=""><div class="flex flex-col space-y-1 mb-4"><label for="email" class="text-sm font-medium" data-svelte-h="svelte-lcgwjg">Username</label> <input type="text" id="username" name="username" required autocomplete="off" class="my-input"${add_attribute("value", username, 0)}></div> <div class="flex flex-col space-y-1 mb-4"><label for="password" class="text-sm font-medium" data-svelte-h="svelte-1r41dkc">Password</label> <div class="w-full h-fit relative"><input name="password" required autocomplete="off" class="my-input"${add_attribute("type", "password", 0)}> <input type="checkbox" id="passwordCheckbox" src="../../../signin/slashed-eye.svg" alt="eye" tabindex="-1" class="w-6 absolute top-1/2 -translate-y-1/2 right-0 -translate-x-2 z-20 cursor-pointer active:scale-90 transition-all"${add_attribute("checked", showPassword, 1)}></div></div> <div class="flex flex-col space-y-1 mb-8"><label for="password" class="text-sm font-medium" data-svelte-h="svelte-11yynbm">Confirm Password</label> <div class="w-full h-fit relative"><input id="confirm_password" name="confirm_password" required autocomplete="off" class="my-input"${add_attribute("type", "password", 0)}> <input type="checkbox" id="passwordCheckbox" src="../../../signin/slashed-eye.svg" alt="eye" tabindex="-1" class="w-6 absolute top-1/2 -translate-y-1/2 right-0 -translate-x-2 z-20 cursor-pointer active:scale-90 transition-all"${add_attribute("checked", showPassword, 1)}></div> <p class="${["text-red-500 text-sm visible", "hidden"].join(" ").trim()}" data-svelte-h="svelte-udg4ew">Passwords do not match</p></div> <button type="submit" ${""} class="text-base my-button-2 disabled:opacity-75 disabled:pointer-events-none disabled:cursor-not-allowed mb-8"><span class="relative z-10" data-svelte-h="svelte-1c4w2k4">Register</span></button></form> <p class="text-sm text-center pt-4" data-svelte-h="svelte-qsvn8e">Already have an account? <a href="/login" class="text-purple-500 hover:underline select-none">Log In</a></p></div></section>`;
});
export {
  Page as default
};
