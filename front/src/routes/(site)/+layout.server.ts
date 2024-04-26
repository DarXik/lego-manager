import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../../../.svelte-kit/types/src/routes/login/$types";

export const load = (async ({ locals }) => {

    console.log(locals);

    if (!locals.session && locals.user) {
        redirect(302, "/login");

    } else {
        const response = await fetch('http://localhost:3000/api/v1/sets', {
            method: 'GET',
            headers: {
                "Authorization": locals.session || ""
            }
        })
        
        const res1 = await response.json()
        console.log(res1)

        return {
            session: locals.session,
            sets: res1
        }
    }


}) satisfies PageServerLoad;