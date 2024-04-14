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
        console.log(await user?.isValidPassword(req.body.password))
        return res.send("wrong password").status(401)
    }

    const userSession: string = createToken(user.customId.toString()).toString()
    console.log(userSession)

    try {
        await User.updateOne({customId: user.customId}, {sessions: [...user.sessions, userSession]})

        res.send({
            session: userSession,
            username: user.username,
            email: user.email,
            sets: user.sets

        }).status(200)

    } catch (err) {
        console.log(err)
        res.send("could not be authenticated").status(503)
    }
}

export default {post}