import {Request, Response} from "express"
import {User} from "../models/User"
import {createToken, verifyUser} from "../services/userAuthentication"

const post = async (req: Request, res: Response) => {
    if (!req.body || !req.headers.authorization) {
        return res.send(false).status(404)
    }

    const verifiedUser: any = verifyUser(req.headers.authorization)
    console.log("user check: ", verifiedUser)

    if (!verifiedUser.user || verifiedUser.token !== verifiedUser.user.customId || !verifiedUser) {
        return res.send(false).status(404)
    }
    else{
        return res.send(true).status(200)
    }
}

export default {post}