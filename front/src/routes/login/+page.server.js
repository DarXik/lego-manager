export const actions = {
    default: async ({request, cookies}) => {
        const data = await request.formData();

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
                let res1 = await response.json()

                cookies.set("session", res1.session, {
                    path: "/",
                    httpOnly: true,
                    sameSite: "strict",
                    secure: true,
                    maxAge: 60 * 60 * 24 * 60
                })
                
                return {
                    success: true,
                    user:{
                        username: res1.username,
                        email: res1.email
                    }
                }

            } else {
                return {
                    problem: await response.json()
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
};
