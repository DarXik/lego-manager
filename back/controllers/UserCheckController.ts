import {Request, Response} from "express"
import {User} from "../models/User"
import {createToken, verifyUser} from "../services/userAuthentication"

const get = async (req: Request, res: Response) => {  

    if (!req.headers.authorization) {
        return res.send(false).status(400)
    }

    const verifiedUser: any = await verifyUser(req.headers.authorization)    

    if (verifiedUser.user && verifiedUser.token) {        
        return res.send(true).status(200)
    }
    else{
        return res.send(false).status(404)
    }
}

export default {get}