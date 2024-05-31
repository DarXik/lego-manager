import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../../../.svelte-kit/types/src/routes/login/$types";

export const load = (async ({ locals, data }: { locals: any; data: any; }) => {

    if (!locals.session && locals.user) {
        redirect(302, "/login");

    } else {

        const response = await fetch('http://backend:3000/user/preferences', {
            method: 'GET',
            headers: {
                "Authorization": locals.session || ""
            }
        })

        const res = await response.json()

        return {
            ...data,
            sessionId: locals.session,
            username: res.username,
            email: res.email,
            currency: res.preferredCurrency,
            language: res.preferredLanguage
        }
    }


})