import {Request, Response} from "express"

const post = async (req: Request, res: Response) => {
    const set = req.body.setNumber
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
            res.send("set not found").status(404)
        }

    } catch (error) {
        console.log(error)
        res.send("couldn't fetch from db").status(500)
    }

}

export default {post}