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
        console.log(decoded)
        try {
            const foundUser = await prisma.users.findUnique({ where: { id: decoded.user } })

            if (!foundUser?.sessions?.sessions?.includes(token)) {
                return {
                    user: null,
                    token: null
                }
            }
            console.log("auth: ", foundUser?.username);
            console.log("decoded: ", decoded);


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