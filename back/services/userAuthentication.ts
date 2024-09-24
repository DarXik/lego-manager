import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "../config/prisma";

dotenv.config()

const secretKey = process.env.JWT_SECRET || "";

const createToken = (user: string) => {
    return jwt.sign({ user }, secretKey, {
        expiresIn: "60d",
    })
}

const verifyUser = async (token: string) => {
    try {
        const decoded: any = jwt.verify(token, secretKey)

        try {
            const foundUser = await prisma.users.findFirst({
                where: {
                    AND:
                        [
                            { id: decoded.user },
                            { sessions: { some: { token: token } } },
                            { sessions: { some: { userId: decoded.user } } },
                        ]
                }
            })

            if (foundUser) {
                return {
                    user: foundUser,
                    token: decoded.user
                }
            }

            return {
                user: null,
                token: null
            }
        }
        catch (err) {
            console.log(err)
            return {
                user: null,
                token: null
            }
        }
    } catch (err) {
        console.log(err)
        return {
            user: null,
            token: null
        }
    }
}

export { createToken, verifyUser }