import { Request, Response } from "express"
import { verifyUser } from "../services/userAuthentication";
import prisma from "../config/prisma";

const get = async (req: Request, res: Response) => {

    if (!req.params.query || !req.headers.authorization) {
        return res.status(400).send({ message: "something is missing" })
    }

    const verifiedUser: any = await verifyUser(req.headers.authorization.toString())

    if (!verifiedUser.user || !verifiedUser.token) {
        return res.status(404).send({ message: "user not found" })
    }

    const set = req.params.query

    try {
        // poslat i theme name
        console.log("searching for: ", set)
        const headers = {
            'Accept': 'application/json',
            'Authorization': 'key fea25735873965685e52dfba8ad25aa8'
        };

        const responseRebrickableSet = await fetch(`https://rebrickable.com/api/v3/lego/sets/?page=1&page_size=50&search=${set}`, {
            method: 'GET',
            headers: headers
        })

        const mySets = await prisma.sets.findMany({ where: {} })
        const resSetJSON: any = await responseRebrickableSet.json()
        console.log("mySets: ", mySets)
        let finalSets = [
            ...mySets.map((set: any) => ({
                setNumber: set.setNumber,
                name: set.name,
                yearReleased: set.yearReleased,
                numParts: set.numParts,
                themeName: set.themeName,
            })),
            ...resSetJSON.results.map((set: any) => ({
                setNumber: set.set_num,
                name: set.name,
                yearReleased: set.year,
                numParts: set.num_parts,
            }))]

        if (finalSets.length > 0) {
            res.status(200).send(finalSets);

        } else {
            res.status(404).send({ message: "sets not found" })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "couldn't fetch from db" })
    }

}

export default { get }