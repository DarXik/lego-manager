import { Request, Response } from "express"
import { verifyUser } from "../services/userAuthentication";
import { Set } from "../models/Set";

const get = async (req: Request, res: Response) => {
    if (!req.headers.authorization) {
        return res.send("something is missing").status(400)
    }

    const verifiedUser: any = await verifyUser(req.headers.authorization.toString())

    console.log(verifiedUser);

    if (!verifiedUser.user || !verifiedUser.token) {
        return res.send({message:"user not found"}).status(404)
    }

    const resSetJSON = await Set.find({ownedBy: verifiedUser.user._id})

    console.log(resSetJSON);

    return res.send(resSetJSON).status(200)
    

    // res.send(resSetJSON.results.map((set: any) => ({
    //     setNumber: set.set_num,
    //     name: set.name,
    //     yearReleased: set.year,
    // }))).status(200);
}

export default { get }