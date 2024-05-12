import * as server from '../entries/pages/register/_page.server.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/register/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/register/+page.server.js";
export const imports = ["_app/immutable/nodes/9.BhvqKPFy.js","_app/immutable/chunks/scheduler.DumJczGM.js","_app/immutable/chunks/index.BeRZsODA.js","_app/immutable/chunks/forms.C95dzdHT.js","_app/immutable/chunks/entry.Bf_ZW4Bx.js","_app/immutable/chunks/index.JbVbP8D2.js","_app/immutable/chunks/index.DuuarKUS.js"];
export const stylesheets = ["_app/immutable/assets/app.DouZvqOd.css"];
export const fonts = [];
