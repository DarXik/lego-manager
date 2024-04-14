import {Request, Response} from "express"
import {Set} from "../models/Set"

const post = async (req: Request, res: Response) => {
    const set = req.body.json()
    console.log(set)

    try {

        let resThemeName: string = "unknown"
        const headers = {
            'Accept': 'application/json',
            'Authorization': 'key fea25735873965685e52dfba8ad25aa8'
        };

        try {
            const responseTheme = await fetch(`https://rebrickable.com/api/v3/lego/themes/${set.themeId}`, {
                method: 'GET',
                headers: headers
            })

            if (responseTheme.ok) {
                resThemeName = (await responseTheme.json()).name
            }

            console.log("theme not found")

        } catch (e) {
            console.log(e)
        }

        // res.send({
        //     setNumber: responseSet.set_num,
        //     name: resSetJSON.results[0].name,
        //     yearReleased: resSetJSON.results[0].year,
        //     partsAmount: resSetJSON.results[0].num_parts,
        //     themeId: resSetJSON.results[0].theme_id,
        //     themeName: resThemeName,
        // }).status(200)

        const newSet = new Set({
            setNumber: set.number,
            name: set.name,
            description: set.description,
            partsAmount: set.partsAmount,
            themeId: set.themeId,
            themeName: resThemeName,
            yearReleased: set.year,
            bought: set.bought,
            yearBought: set.yearBought,
            price: set.price,
            imageThumbnailUrl: set.image,
            instructionsUrl: set.instructions,
            ownedBy: set.ownedBy
        })

        try {
            if (await newSet.save()) {
                res.send("set added").status(201)

            } else {
                res.send("set could not be added").status(503)
            }

        } catch (err) {
            res.send("set could not be added").status(503)
        }

    } catch (e) {
        console.log(e)
    }
}

export default {post}