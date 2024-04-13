import {redirect} from "@sveltejs/kit";

export const actions = {
    default: async ({request}) => {
        const data = await request.formData();
        console.log(data);

        const email = data.get("email");
        const password = data.get("password");

        if (!email || !password) {
            return {
                email,
                problem: "Missing email or password"
            };
        }


        try {
            let response = await fetch("http://localhost:3000/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                })
            })

            if (response.ok) {
                return redirect(302, "/");
            }
            else {
                return {
                    problem: await response.text()
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
};
