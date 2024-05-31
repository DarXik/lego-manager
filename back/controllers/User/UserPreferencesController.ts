import { Request, Response } from "express"
import prisma from "../../config/prisma"
import { verifyUser } from "../../services/userAuthentication"


const get = async (req: Request, res: Response) => {
    if ((!req.headers.authorization)) {
        return res.status(400).send({ message: "something is missing" })
    }

    const verifiedUser: any = await verifyUser(req.headers.authorization.toString())
    if (!verifiedUser.user || !verifiedUser.token) {
        return res.status(404).send({ message: "user not found" })
    }

    try {
        const user: any = await prisma.users.findUnique({ where: { id: verifiedUser.user.id } })

        return res.status(200).send({
            username: user.username,
            email: user.email,
            preferredCurrency: user.preferredCurrency,
            preferredLanguage: user.preferredLanguage
        })

    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ message: "something went wrong" })
    }
}

export default { get }