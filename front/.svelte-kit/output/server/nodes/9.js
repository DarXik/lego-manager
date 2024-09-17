import * as server from '../entries/pages/register/_page.server.ts.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/register/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/register/+page.server.ts";
export const imports = ["_app/immutable/nodes/9.yHY8nzYZ.js","_app/immutable/chunks/scheduler.hocyY_A1.js","_app/immutable/chunks/index.Cn_gAlkC.js","_app/immutable/chunks/forms.CtN-8kRd.js","_app/immutable/chunks/entry.DzSHvPUc.js","_app/immutable/chunks/index.DZQ1DQO6.js","_app/immutable/chunks/index.CJ42zpi2.js"];
export const stylesheets = ["_app/immutable/assets/app.DQs7Mt1k.css"];
export const fonts = [];
