export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["75192_Prod.webp","arrow-sort.svg","bough-no.svg","currencies/czk.svg","currencies/euro.svg","currencies/gbp.svg","currencies/usd.svg","error/error404.gif","error/error404.png","favicon.svg","lego-head.svg","navbar/account.svg","navbar/add.svg","navbar/hamburger.svg","navbar/lego-logo.svg","navbar/logout.svg","navbar/settings.svg","ornithopter-testing-2.webp","ornithopter-testing-3.png","ornithopter-testing.webp","owned-yes.svg","placeholder.webp","set/added.svg","set/bricks-icon.svg","set/collection-icon.svg","set/download.svg","set/edit-set.svg","set/last-modified.svg","set/number-icon.svg","set/open.svg","set/owned-icon.svg","set/price-euro-icon.svg","set/remove-set.svg","set/year-bought-icon.svg","set/year-released-icon.svg","sort.svg"]),
	mimeTypes: {".webp":"image/webp",".svg":"image/svg+xml",".gif":"image/gif",".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.CsVAnjy0.js","app":"_app/immutable/entry/app.D-nSq627.js","imports":["_app/immutable/entry/start.CsVAnjy0.js","_app/immutable/chunks/entry.Bf_ZW4Bx.js","_app/immutable/chunks/scheduler.DumJczGM.js","_app/immutable/chunks/index.JbVbP8D2.js","_app/immutable/entry/app.D-nSq627.js","_app/immutable/chunks/scheduler.DumJczGM.js","_app/immutable/chunks/index.BeRZsODA.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js'))
		],
		routes: [
			{
				id: "/(site)",
				pattern: /^\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/(site)/account",
				pattern: /^\/account\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/(site)/add-set",
				pattern: /^\/add-set\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/api/deleteSet",
				pattern: /^\/api\/deleteSet\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/deleteSet/_server.js'))
			},
			{
				id: "/api/logout",
				pattern: /^\/api\/logout\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/logout/_server.js'))
			},
			{
				id: "/api/updatePreference",
				pattern: /^\/api\/updatePreference\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/updatePreference/_server.js'))
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/register",
				pattern: /^\/register\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/(site)/settings",
				pattern: /^\/settings\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/(site)/set/[slug]",
				pattern: /^\/set\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

export const prerendered = new Set([]);

export const base = "";