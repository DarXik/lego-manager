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
        const foundUser = await User.findOne({ _id: decoded.user, sessions: { $in: [token] } })

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
    } catch (err) {
        console.log(err)
        return {
            user: null,
            token: null
        }
    }
}

export { createToken, verifyUser }