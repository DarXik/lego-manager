import { redirect } from "@sveltejs/kit";
import { env } from '$env/dynamic/private';
const secretOrigin = env.SECRET_ORIGIN;

export const load = (async ({ locals, data }: { locals: any; data: any; }) => {

    if (!locals.session && locals.user) {
        redirect(302, "/login");

    } else {

        const response = await fetch(`http://${secretOrigin}:3000/user/preferences`, {
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