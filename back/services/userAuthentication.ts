import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/User";

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
        const foundUser = await User.findOne({ customId: decoded.user, sessions: { $in: [token] } })

        console.log("auth: ", foundUser);

        if (!foundUser) {
            return {
                user: null,
                token: null
            }
        }
        return {
            user: foundUser,
            token: decoded.user
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