import multer from "multer";
import { v4 as uuidv4 } from 'uuid'
import ImageKit from "imagekit"
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const user = request.headers.get("Cookies") || "";    
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });
    var imagekit = new ImageKit({
        publicKey: "public_hFsIFiIOg4axObbWKYA91OfgDfk=",
        privateKey: "private_Dr0ocLSWUIwBaySyfqdkScBPVFE=",
        urlEndpoint: "https://ik.imagekit.io/oaoxuk4he"
    })

    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const price = formData.get("price")?.toString();
    const setNumber = formData.get("setNumber")?.toString();
    const partsAmount = formData.get("partsAmount")?.toString();
    const themeId = formData.get("themeId")?.toString();
    const yearReleased = formData.get("yearReleased")?.toString();
    const yearBought = formData.get("yearBought")?.toString();
    const isBought = !!formData.get("isBought");
    const imageThumbnail = formData.get("imageThumbnail") as File;
    console.log(imageThumbnail)

    try {
        const buffer = Buffer.from(await imageThumbnail.arrayBuffer());
        const base64Image = buffer.toString('base64');
        const imageData = `data:${imageThumbnail?.type};base64,${base64Image}`

        const resp = await imagekit.upload({
            file: imageData,
            fileName: `lego-${uuidv4()}`,
            // ${imageThumbnail.name.split('.').pop()}
        })

        return new Response(
            JSON.stringify({
                url: await resp.url,
                status: 200,
                statusText: "Image uploaded successfully"
            })
        );

    }
    catch (error) {
        console.log(error)
        return new Response(
            JSON.stringify({
                error: error,
                status: 400,
                statusText: "Image upload failed"
            })
        )
    }

    let newSet = await fetch("http://localhost:3000/api/v1/sets/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": user || ""
        },
        body: JSON.stringify({
            name: name,
            description: description,
            price: price,
            setNumber: setNumber,
            partsAmount: partsAmount,
            themeId: themeId,
            yearReleased: yearReleased,
            yearBought: yearBought,
            isBought: isBought,
        })

    })
    return new Response(await newSet.text());

}