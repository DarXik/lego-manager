import type { Actions } from './$types';
import axios from 'axios';


export const actions: Actions = {
    deleteAccount: async ({ locals, cookies }: any) => {
        // const res = await fetch(`http://localhost:3000/user/deleteAccount`, {
        //     method: "DELETE",
        //     headers: new Headers({
        //         "Authorization": locals.session || ""
        //     })
        // },);

        // console.log(await res.json())

        // if (await res.ok) {

        //     cookies.delete("session", { path: "/" });
        //     redirect(301, "/register");
        //     return {
        //         message: "Account deleted"
        //     }
        // }
        // else {
        //     return {
        //         message: "Account could not be deleted"
        //     }
        // }
    },
    updateUsername: async ({ locals, request }: any) => {
        const formData = await request.formData();
        console.log("update: ", formData.get("newUsername"))

        if (!formData.get("newUsername")) {
            return {
                problem: "Missing required fields"
            };
        }


        // const response = await axios({
        //     url: "http://localhost:3000/user/update",
        //     method: "PATCH",
        //     headers: {
        //         "Authorization": locals.session || "",
        //     },
        //     data: {
        //         newUsername: formData.get("newUsername")
        //     }
        // });

        const response = await fetch(`http://localhost:3000/user/update`, {
            method: "PATCH",
            headers: new Headers({
                "Authorization": locals.session || "",
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({
                newUsername: formData.get("newUsername")
            })
        });



        if (await response.ok) {
            return {
                message: "Username updated"
            }
        } else if (response.status === 400) {
            return {
                problem: "Username already exists"
            }
        }
        else {
            return {
                problem: "Username could not be updated"
            }
        }
    },

}

export const load = async ({ locals, data }: any) => {
    const res = await fetch(`http://localhost:3000/user/sessions`, {
        method: "GET",
        headers: new Headers({ "Authorization": locals.session || "" })
    });

    const sessions = await res.json();

    return {
        ...data,
        sessions
    }
}