import type { Actions } from './$types';
import { env } from '$env/dynamic/private';
const secretOrigin = env.SECRET_ORIGIN;

export const load = async ({ fetch, locals, data }) => {

    const response = await fetch(`http://${secretOrigin}:3000/api/v1/sets`, {
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
