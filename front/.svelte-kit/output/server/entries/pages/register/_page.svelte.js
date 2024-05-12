import { c as create_ssr_component, e as escape, b as add_attribute } from "../../../chunks/ssr.js";
/* empty css                  */
import { g as goto } from "../../../chunks/client.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form } = $$props;
  let { data } = $$props;
  let password = "";
  let confirm_password = "";
  let passwordMatch = false;
  let showPassword = false;
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  {
    if (password.length > 0 && confirm_password.length > 0) {
      passwordMatch = password !== confirm_password;
    } else if (password.length === 0 && confirm_password.length === 0) {
      passwordMatch = false;
    }
  }
  {
    console.log(form);
  }
  {
    if (form?.success) {
      console.log("success");
      goto();
    }
  }
  return `<section class="flex items-center justify-center min-h-screen mx-10"><div class="${[
    "w-full max-w-md p-8 space-y-4 bg-gray-950 border border-transparent shadow-lg",
    form?.problem ? "border-red-500" : ""
  ].join(" ").trim()}"><h1 class="text-2xl font-semibold text-center" data-svelte-h="svelte-j8qtns">Register</h1> ${form && !form.success ? `<p class="text-lg text-center font-semibold error text-red-500">${escape(form?.problem.message)}</p>` : ``} <form method="POST" class=""><div class="flex flex-col space-y-1 mb-4" data-svelte-h="svelte-13u0c6r"><label for="email" class="text-sm font-medium">Username</label> <input type="text" id="username" name="username" required autocomplete="off" class="my-input"></div> <div class="flex flex-col space-y-1 mb-4"><label for="email" class="text-sm font-medium" data-svelte-h="svelte-1tub414">Email</label> <input type="text" id="email" name="email"${add_attribute("value", form?.email ?? "", 0)} required autocomplete="off" class="my-input"></div> <div class="flex flex-col space-y-1 mb-4"><label for="password" class="text-sm font-medium" data-svelte-h="svelte-1r41dkc">Password</label> <div class="w-full h-fit relative"><input${add_attribute("type", "password", 0)} id="password" name="password" required autocomplete="off" class="my-input"> <input type="checkbox" id="passwordCheckbox" src="../../../signin/slashed-eye.svg" alt="eye" tabindex="-1" class="w-6 absolute top-1/2 -translate-y-1/2 right-0 -translate-x-2 z-20 cursor-pointer active:scale-90 transition-all"${add_attribute("checked", showPassword, 1)}></div></div> <div class="flex flex-col space-y-1 mb-8"><label for="password" class="text-sm font-medium" data-svelte-h="svelte-11yynbm">Confirm Password</label> <div class="w-full h-fit relative"><input${add_attribute("type", "password", 0)} id="confirm_password" name="confirm_password" required autocomplete="off" class="my-input"> <input type="checkbox" id="passwordCheckbox" src="../../../signin/slashed-eye.svg" alt="eye" tabindex="-1" class="w-6 absolute top-1/2 -translate-y-1/2 right-0 -translate-x-2 z-20 cursor-pointer active:scale-90 transition-all"${add_attribute("checked", showPassword, 1)}></div> <p class="${["text-red-500 text-sm", !passwordMatch ? "hidden" : ""].join(" ").trim()}" data-svelte-h="svelte-1kakwtl">Passwords do not match</p></div> <button type="submit" ${passwordMatch ? "disabled" : ""} class="text-base my-button-2 disabled:opacity-75 disabled:pointer-events-none disabled:cursor-not-allowed mb-8"><span class="relative z-10" data-svelte-h="svelte-1c4w2k4">Register</span></button></form> <p class="text-sm text-center pt-4" data-svelte-h="svelte-qsvn8e">Already have an account? <a href="/login" class="text-purple-500 hover:underline select-none">Log In</a></p></div></section>`;
});
export {
  Page as default
};
