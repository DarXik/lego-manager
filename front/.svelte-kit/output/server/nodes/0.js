

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.RygA5Jjh.js","_app/immutable/chunks/scheduler.hocyY_A1.js","_app/immutable/chunks/index.Cn_gAlkC.js"];
export const stylesheets = [];
export const fonts = [];
