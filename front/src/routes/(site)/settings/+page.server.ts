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


        try {
            const response = await axios({
                url: "http://localhost:3000/user/update",
                method: "PATCH",
                headers: {
                    "Authorization": locals.session || "",
                },
                data: formData
            });

            console.log(response);
            return response.data;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
}