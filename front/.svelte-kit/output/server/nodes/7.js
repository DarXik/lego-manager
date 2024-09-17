import * as server from '../entries/pages/(site)/settings/_page.server.ts.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(site)/settings/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(site)/settings/+page.server.ts";
export const imports = ["_app/immutable/nodes/7.B3AV6yKM.js","_app/immutable/chunks/scheduler.hocyY_A1.js","_app/immutable/chunks/index.Cn_gAlkC.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/forms.CtN-8kRd.js","_app/immutable/chunks/entry.DzSHvPUc.js","_app/immutable/chunks/index.DZQ1DQO6.js","_app/immutable/chunks/index.CJ42zpi2.js"];
export const stylesheets = [];
export const fonts = [];
