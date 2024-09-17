import * as server from '../entries/pages/(site)/account/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(site)/account/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(site)/account/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.3Sbssu4t.js","_app/immutable/chunks/scheduler.hocyY_A1.js","_app/immutable/chunks/index.Cn_gAlkC.js","_app/immutable/chunks/index.CJ42zpi2.js"];
export const stylesheets = ["_app/immutable/assets/4.DV3SEB23.css"];
export const fonts = [];
