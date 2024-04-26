import { Request, Response } from "express"
import { verifyUser } from "../services/userAuthentication"

const get = async (req: Request, res: Response) => {

    if (!req.headers.authorization) {
        return res.status(400)
    }

    const verifiedUser: any = await verifyUser(req.headers.authorization)

    if (verifiedUser.user && verifiedUser.token) {
        console.log("user verified: ", verifiedUser.user.username)
        return res.status(200)
    }
    else {
        console.log("user not verified")
        return res.status(404)
    }
}

export default { get }