import * as server from '../entries/pages/(site)/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(site)/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(site)/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.BEAIliAd.js","_app/immutable/chunks/scheduler.hocyY_A1.js","_app/immutable/chunks/index.Cn_gAlkC.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/entry.DzSHvPUc.js","_app/immutable/chunks/index.DZQ1DQO6.js","_app/immutable/chunks/index.CJ42zpi2.js"];
export const stylesheets = ["_app/immutable/assets/3.CmD9uA1w.css"];
export const fonts = [];
