import type { Actions } from './$types';

export const actions = {
	// default: async (event) => {
	// 	// TODO log the user in
	// },
	searchLegoSet: async ({ request, cookies }) => {
		const data = await request.formData();

		const searchQuery = data.get("searchQuery");

		let response = await fetch(`http://localhost:3000/api/v1/sets/search?q=${searchQuery}`, {
			method: "GET",
			headers: new Headers({
				"Authorization": cookies.get("session") || ""
			})
		});

		return {
			sets: await response.json()
		}

	}
} satisfies Actions;