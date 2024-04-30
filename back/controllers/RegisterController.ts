import { Request, Response } from "express"
// import { User } from "../models/User"
import { PrismaClient } from "@prisma/client"
import { v4 as uuidv4 } from 'uuid'
import { hashPassword } from "../services/userHash"
import prisma from "../config/prisma"


async function createUser(email: string, username: string, password: string) {
    const user = await prisma.users.create({
        data: {
            email: email,
            username: username,
            password: await hashPassword(password),
        },
    });
    return user;
}

const post = async (req: Request, res: Response) => {
    console.log(req.body);

    if (!req.body.email || !req.body.password) {

        console.log("email and password are required")
        return res.status(400).send({ message: "email and password are required" })
    }

    try {
        if (await prisma.users.findFirst({ where: { email: req.body.email } }) || await prisma.users.findFirst({ where: { username: req.body.username } })) {
            console.log("user already exists")
            return res.status(409).send({ message: "user already exists" })
        }
    }
    catch (err) {
        console.log(err)
    }

    try {
        const user = await createUser(req.body.email, req.body.username ? req.body.username : req.body.email, req.body.password)
        console.log(user)

        if (user) {
            console.log("user registered")

            res.status(201).send({ message: "user registered" })
        }
        else {
            console.log("user could not be registered")
            res.status(503).send({ message: "user could not be registered due to saving the user" })
        }
    }
    catch (err) {
        console.log("user could not be registered")
        res.status(503).send({ message: "user could not be registered due to the server error" })
    }

}

export default { post }