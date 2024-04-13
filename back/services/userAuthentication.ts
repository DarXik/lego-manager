import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

const secretKey = process.env.JWT_SECRET || "";

const createToken = (user: string) => {
    return jwt.sign({ user }, secretKey, {
        expiresIn: "60d",
    })
}

const verifyToken = (token: string) => {
    console.log(jwt.verify(token, secretKey));
    return jwt.verify(token, secretKey)
}

export { createToken, verifyToken }