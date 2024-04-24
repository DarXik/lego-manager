import { Request, Response } from "express"
// import { User } from "../models/User"
import { PrismaClient } from "@prisma/client"
import { v4 as uuidv4 } from 'uuid'
import { hashPassword } from "../services/userHash"
import prisma from "../config/prisma"


async function createUser(email: string, username: string, password: string) {
    const user = await prisma.users.create({
        data: {
            id: uuidv4(),
            email: email,
            username: username,
            password: await hashPassword(password),
            sessions: { sessions: [] },
            sets: { sets: [] }
        },
    });
    return user;
}

const post = async (req: Request, res: Response) => {
    console.log(req.body);

    if (!req.body.email || !req.body.password) {

        console.log("email and password are required")
        return res.send("email and password are required").status(400)
    }

    try {
        if (await prisma.users.findUnique({ where: { email: req.body.email } }) ||
            await prisma.users.findUnique({ where: { username: req.body.username } })) {

            console.log("user already exists")
            return res.send("user already exists").status(409)
        }
    }
    catch (err) {
        console.log(err)
    }


    try {
        const user = await createUser(req.body.email, req.body.username ? req.body.username : req.body.email, req.body.password)
        console.log(user)

        if (await user) {
            console.log("user registered")
            res.send("user registered").status(201)
        }
        else {
            console.log("user could not be registered")
            res.send("user could not be registered").status(503)
        }
    }
    catch (err) {
        console.log("user could not be registered")
        res.send("user could not be registered").status(503)
    }

}

export default { post }