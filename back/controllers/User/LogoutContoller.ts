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

        // await prisma.users.update({
        //     where: {
        //         id: verifiedUser.user.id
        //     },
        //     data: {
        //         sessions: {
        //             disconnect: [verifiedUser.token]
        //         }
        //     }
        // })

        let session = await prisma.sessions.findFirst({
            where: {
                userId: verifiedUser.user.id
            }
        })

        await prisma.sessions.delete({
            where: {
                id: session?.id
            }
        })

        console.log("user logged out");
        
        return res.status(200).send({ message: "user logged out" })

    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ message: "user could not be logged out" })
    }
}

export default { get }