import type { Actions } from './$types';

export const load = async ({ fetch, locals }) => {

	const response = await fetch('http://localhost:3000/api/v1/sets', {
		method: 'GET',
		headers:{
			"Authorization": locals.session || ""
		}
	})

	return{
		sets: await response.json()
	}
}

export const actions = {
	// default: async (event) => {
	// 	// TODO log the user in
	// },
	searchLegoSet: async ({ request, locals }) => {
		const data = await request.formData();

		const searchQuery = data.get("searchQuery");

		let response = await fetch(`http://localhost:3000/api/v1/sets/search?q=${searchQuery}`, {
			method: "GET",
			headers: new Headers({
				"Authorization": locals.session || ""
			})
		});

		if (response.ok) {
			return {
				success: true,
				sets: await response.json()
			}
		}
		else {
			return {
				success: false,
				message: (await response.json()).message
			}
		}

	}
} satisfies Actions;