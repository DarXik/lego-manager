import * as server from '../entries/pages/(site)/_layout.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(site)/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/(site)/+layout.server.ts";
export const imports = ["_app/immutable/nodes/2.Dw2pobnn.js","_app/immutable/chunks/scheduler.DumJczGM.js","_app/immutable/chunks/index.BeRZsODA.js","_app/immutable/chunks/index.DuuarKUS.js","_app/immutable/chunks/store.CorSUvV1.js","_app/immutable/chunks/index.JbVbP8D2.js"];
export const stylesheets = ["_app/immutable/assets/app.DouZvqOd.css"];
export const fonts = [];
