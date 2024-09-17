import * as server from '../entries/pages/(site)/_layout.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(site)/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/(site)/+layout.server.ts";
export const imports = ["_app/immutable/nodes/2.DWUj54ct.js","_app/immutable/chunks/scheduler.hocyY_A1.js","_app/immutable/chunks/index.Cn_gAlkC.js","_app/immutable/chunks/index.CJ42zpi2.js","_app/immutable/chunks/index.DZQ1DQO6.js"];
export const stylesheets = ["_app/immutable/assets/app.DQs7Mt1k.css"];
export const fonts = [];
