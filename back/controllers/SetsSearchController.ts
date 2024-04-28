import { Request, Response } from "express"
import { verifyUser } from "../services/userAuthentication";

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
        console.log("searching for: ", set)
        const headers = {
            'Accept': 'application/json',
            'Authorization': 'key fea25735873965685e52dfba8ad25aa8'
        };

        const responseRebrickableSet = await fetch(`https://rebrickable.com/api/v3/lego/sets/?page=1&page_size=50&search=${set}`, {
            method: 'GET',
            headers: headers
        })

        const resSetJSON: any = await responseRebrickableSet.json()

        if (resSetJSON.count > 0) {
            res.status(200).send(resSetJSON.results.map((set: any) => ({
                setNumber: set.set_num,
                name: set.name,
                yearReleased: set.year,
                numParts: set.num_parts,
                themeId: set.theme_id
            })));

        } else {
            res.status(404).send({ message: "set not found" })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "couldn't fetch from db" })
    }

}

export default { get }