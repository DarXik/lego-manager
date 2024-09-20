import { Request, Response } from 'express'
import { verifyUser } from "../../services/userAuthentication";
import prisma from "../../config/prisma";

const patch = async (req: Request, res: Response) => {
    // počáteční kontrola
    console.log(req.body);
    console.log(req.headers)
    if (!req.headers.authorization || !req.body) {
        return res.status(400).send({ message: "something is missing" })
    }
    const verifiedUser = await verifyUser(req.headers.authorization.toString())
    if (!verifiedUser.user || !verifiedUser.token) {
        return res.status(404).send({ message: "user not found" })
    }

    try {
        const set = await prisma.sets.findFirst({
            where: {
                AND: [{ id: req.body.setId }, { usedBy: { some: { id: verifiedUser.user.id } } }]

            },
        })

        console.log(set);
        if (!set) {
            return res.status(404).send({ message: "set not found" })
        }

        if (req.body.action == "favorite") {
            const newFavorite = await prisma.users.update({
                where: {
                    id: verifiedUser.user.id
                },
                data: {
                    favoritedSets: {
                        connect: {
                            id: req.body.setId
                        }
                    }
                }
            })

            if (newFavorite) {
                return res.status(200).send({ message: "set favorited" })
            }
            else {
                return res.status(404).send({ message: "set could not be favorited" })
            }
        }
        else if (req.body.action == "unfavorite") {
            const newFavorite = await prisma.users.update({
                where: {
                    id: verifiedUser.user.id
                },
                data: {
                    favoritedSets: {
                        disconnect: {
                            id: req.body.setId
                        }
                    }
                }
            })

            if (newFavorite) {
                return res.status(200).send({ message: "set unfavorited" })
            }
            else {
                return res.status(404).send({ message: "set could not be unfavorited" })
            }
        }
        else {
            return res.status(400).send({ message: "wrong action" })
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ message: "something went wrong" })
    }
}


export default { patch }