import { redirect } from "@sveltejs/kit";

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        console.log(data);

        const email = data.get("email");
        const password = data.get("password");
        const confirm_password = data.get("confirm_password");
        const username = data.get("username");

        if (!email || !password) {
            return {
                email,
                problem: "Missing email or password"
            };
        }

        if(confirm_password !== password) {
            return {
                email,
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
                    email: email,
                    password: password,
                    username: username
                })
            })
            
            if (response.ok) {
                redirect(302, "/");
                
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
