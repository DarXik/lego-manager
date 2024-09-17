export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9')
];

export const server_loads = [2];

export const dictionary = {
		"/(site)": [~3,[2]],
		"/(site)/account": [~4,[2]],
		"/(site)/add-set": [~5,[2]],
		"/login": [~8],
		"/register": [~9],
		"/(site)/settings": [~7,[2]],
		"/(site)/set/[slug]": [~6,[2]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.svelte';