import { Request, Response } from "express"
import { verifyUser } from "../services/userAuthentication"
import prisma from "../config/prisma"

const patch = async (req: Request, res: Response) => {
    console.log(await req.body);

    if (!req.headers.authorization || !req.body) {
        return res.status(400).send({ message: "something is missing" })
    }

    const verifiedUser: any = await verifyUser(req.headers.authorization.toString())
    if (!verifiedUser.user || !verifiedUser.token) {
        return res.status(404).send({ message: "user not found" })
    }

    if (req.body.currency) {

        try {

            await prisma.users.update({
                where: {
                    id: verifiedUser.user.id
                },
                data: {
                    preferredCurrency: parseInt(req.body.currency)
                }
            })

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
    if (req.body.newPassword) {
        try {

        }

        catch (err) {

        }

    }

}
export default { patch }