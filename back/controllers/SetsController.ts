import { Request, Response } from "express"
import { verifyUser } from "../services/userAuthentication";
import prisma from "../config/prisma";

const get = async (req: Request, res: Response) => {
    if (!req.headers.authorization) {
        return res.send("something is missing").status(400)
    }

    const verifiedUser: any = await verifyUser(req.headers.authorization.toString())

    console.log(verifiedUser);

    if (!verifiedUser.user || !verifiedUser.token) {
        return res.send({ message: "user not found" }).status(404)
    }

    try {
        const sets = await prisma.sets.findMany({ where: { ownedBy: verifiedUser.user.id } })

        if (!sets || sets.length == 0) {
            return res.send({ message: "sets not found" }).status(404)
        }

        const setsWithImages = []

        for (const set of sets) {
            const image = await prisma.images.findUnique({ where: { id: set.imageThumbnail } })

            if (!image) {
                console.error("image not found for set: ", set.imageThumbnail)
                continue;
            }

            const setWithImage = {
                ...set,
                imageThumbnail: image
            }

            setsWithImages.push(setWithImage)
        }

        return res.send(setsWithImages).status(200)
    }
    catch (err) {
        console.log(err)
        return res.send({ message: "sets could not be found" }).status(500)
    }
}

export default { get }