import { redirect } from "@sveltejs/kit";

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        console.log(data);

        const password = data.get("password");
        const confirm_password = data.get("confirm_password");
        const username = data.get("username");

        if (!username || !password) {
            return {
                username,
                problem: "Missing username or password"
            };
        }

        if (confirm_password !== password) {
            return {
                username,
                problem: "Passwords do not match"
            };
        }


        try {
            let response = await fetch("http://localhost:3000/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    password: password,
                    username: username
                })
            })

            console.log(response)

            if (response.ok) {
                // redirect(302, "/");
                return { success: true };

            } else {
                return {
                    success: false,
                    problem: await response.json()
                }
            }

        } catch (error) {
            console.error(error);
        }
    }
};
