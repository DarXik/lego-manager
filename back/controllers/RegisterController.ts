import { Request, Response } from "express"
import { User } from "../models/User"

const post = async (req: Request, res: Response) => {
    console.log(req.body);    

    if  (!req.body.email || !req.body.password) {
        return res.send("email and password are required").status(400)
    }

    if (await User.findOne({ email: req.body.email }) || await User.findOne({ username: req.body.username })) {
        return res.send("user already exists").status(400)
    }

    const newUser = new User({
        username: req.body.username ? req.body.username : req.body.email,
        email: req.body.email,
        password: req.body.password
    })

    try {
        if(await newUser.save()){
            res.send("user registered").status(201)
        }
        else{
            res.send("user could not be registered").status(503)
        }
    }
    catch (err) {
        res.send("user could not be registered").status(503)
    }

}

export default { post }