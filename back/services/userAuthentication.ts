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
        const foundUser = await User.findOne({ sessions: token })

        console.log("decoded: ", decoded.user);
        console.log("foundUser: ", foundUser);

        return {
            user: foundUser,
            token: decoded.user
        }

    } catch (err) {
        console.log(err)
    }
}

export { createToken, verifyUser }