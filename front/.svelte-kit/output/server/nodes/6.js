import * as universal from '../entries/pages/(site)/set/_slug_/_page.js';
import * as server from '../entries/pages/(site)/set/_slug_/_page.server.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(site)/set/_slug_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/(site)/set/[slug]/+page.js";
export { server };
export const server_id = "src/routes/(site)/set/[slug]/+page.server.js";
export const imports = ["_app/immutable/nodes/6.Bi3EGWvM.js","_app/immutable/chunks/scheduler.hocyY_A1.js","_app/immutable/chunks/index.Cn_gAlkC.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/forms.CtN-8kRd.js","_app/immutable/chunks/entry.DzSHvPUc.js","_app/immutable/chunks/index.DZQ1DQO6.js","_app/immutable/chunks/index.CJ42zpi2.js"];
export const stylesheets = ["_app/immutable/assets/6.syIrzaO5.css"];
export const fonts = [];
