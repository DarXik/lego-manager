import { Request, Response } from "express"
import { verifyUser } from "../services/userAuthentication";

const get = async (req: Request, res: Response) => {
    if (!req.query.q || !req.headers.authorization) {
        return res.send("something is missing").status(400)
    }

    const verifiedUser: any = await verifyUser(req.headers.authorization.toString())

    console.log(verifiedUser);

    if (!verifiedUser.user || !verifiedUser.token) {
        return res.send({message:"user not found"}).status(404)
    }

    const set = await req.query.q
    console.log(set)

    try {
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
            res.send(resSetJSON.results.map((set: any) => ({
                setNumber: set.set_num,
                name: set.name,
                yearReleased: set.year,
            }))).status(200);

        } else {
            res.send({message:"set not found"}).status(404)
        }

    } catch (error) {
        console.log(error)
        res.send({message:"couldn't fetch from db"}).status(500)
    }

}

export default { get }