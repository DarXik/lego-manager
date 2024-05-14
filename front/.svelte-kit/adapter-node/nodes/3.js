import * as server from '../entries/pages/(site)/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(site)/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(site)/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.BGdQh97L.js","_app/immutable/chunks/scheduler.DumJczGM.js","_app/immutable/chunks/index.BeRZsODA.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/store.CorSUvV1.js","_app/immutable/chunks/index.JbVbP8D2.js","_app/immutable/chunks/entry.ClxdOwrk.js"];
export const stylesheets = ["_app/immutable/assets/3.CmD9uA1w.css"];
export const fonts = [];
