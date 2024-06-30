import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ locals, cookies }: any) => {
        const res = await fetch(`http://localhost:3000/user/deleteAccount`, {
            method: "DELETE",
            headers: new Headers({
                "Authorization": locals.session || ""
            })
        },);

        console.log(await res.json())

        if (await res.ok) {

            cookies.delete("session", { path: "/" });
            redirect(301, "/login");
            return {
                message: "Account deleted"
            }
        }
        else {
            return {
                message: "Account could not be deleted"
            }
        }
    }
}