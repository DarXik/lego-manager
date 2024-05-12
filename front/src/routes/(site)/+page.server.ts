import type { Actions } from './$types';

export const load = async ({ fetch, locals, data }) => {

    const response = await fetch('http://localhost:3000/api/v1/sets', {
        method: 'GET',
        headers: {
            "Authorization": locals.session || ""
        }
    })

    const res1 = await response.json()

    return {
        ...data,
        sets: res1
    }
}

export const actions = {

} satisfies Actions;