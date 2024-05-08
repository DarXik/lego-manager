import { Request, Response } from "express"
import { verifyUser } from "../services/userAuthentication"
import prisma from "../config/prisma"
import { hashPassword, verifyPassword } from "../services/userHash"

const patch = async (req: Request, res: Response) => {
    if (!req.headers.authorization || !req.body) {
        return res.status(400).send({ message: "something is missing" })
    }

    const verifiedUser: any = await verifyUser(req.headers.authorization.toString())
    if (!verifiedUser.user || !verifiedUser.token) {
        return res.status(404).send({ message: "user not found" })
    }

    if (req.body.currency) {
        console.log(req.body.currency)
        try {

            await prisma.users.update({
                where: {
                    id: verifiedUser.user.id
                },
                data: {
                    preferredCurrency: parseInt(req.body.currency)
                }
            })
            console.log("new currency is", req.body.currency)
            return res.status(200).send({ message: "preferred currency updated" })
        }
        catch (err) {
            console.log(err)
            return res.status(500).send({ message: "preferred currency could not be updated" })
        }
    }
    if (req.body.language) {
        try {

            await prisma.users.update({
                where: {
                    id: verifiedUser.user.id,
                },
                data: {
                    preferredLanguage: parseInt(req.body.language)
                }
            })

            return res.status(200).send({ message: "preferred language updated" })

        }
        catch (err) {
            console.log(err)
            return res.status(500).send({ message: "preferred language could not be updated" })
        }
    }
    if (req.body.newPassword && req.body.newPasswordRepeat && req.body.currentPassword) {
        try {
            if (req.body.newPassword !== req.body.newPasswordRepeat) {
                return res.status(400).send({ message: "passwords do not match" })
            }

            if (!await verifyPassword(req.body.currentPassword, verifiedUser.user.password)) {
                return res.status(400).send({ message: "current password is incorrect" })
            }

            await prisma.users.update({
                where: {
                    id: verifiedUser.user.id
                },
                data: {
                    password: await hashPassword(req.body.newPassword)
                }
            })

            return res.status(200).send({ message: "password updated" })

        }

        catch (err) {
            console.log(err)
            return res.status(500).send({ message: "password could not be updated" })
        }

    }

}
export default { patch }