import {Request, Response} from "express"
import {User} from "../models/User"
import {createToken} from "../services/userAuthentication"

const post = async (req: Request, res: Response) => {
    console.log(req.body);

    if (!req.body.email || !req.body.password) {
        return res.send("email and password are required").status(400)
    }

    const user = await User.findOne({email: req.body.email}) || await User.findOne({username: req.body.email})

    if (!user) {
        return res.send("user not found").status(404)
    }

    if (!await user?.isValidPassword(req.body.password)) {
        return res.send("wrong password").status(401)
    }

    const userSession = createToken(user?.customId.toString())

    try {
        user?.sessions.push(userSession)
    } catch (err) {
        console.log(err)
        res.send("could not be authenticated").status(503)
    }

    res.send({
        session: userSession,
        username: user?.username,
        email: user?.email,
        sets: user?.sets

    }).status(200)
}

export default {post}