import type { Actions } from './$types';
import { google } from "googleapis";
import apiKeys from "./apiKeyGoogle.json"


async function authorize() {

    const SCOPE = ["https://www.googleapis.com/auth/drive"]
    const auth = new google.auth.JWT(
        apiKeys.client_email,
        "" || undefined,
        apiKeys.private_key,
        SCOPE
    )

    await auth.authorize()

    return auth;
}

async function uploadFile(auth: any, fileID: string, file: any) {
    return new Promise((resolve, reject) => {
        const drive = google.drive({ version: 'v3', auth });

        var fileMetadata = {
            name: fileID,
            parents: ["1bBscV_4FIfGKcs7HvQ2-Fa87Wq0EEHox"]
        }

        drive.files.create({
            resource: fileMetadata,
            media: {
                body: file,
                mimeType: "image/png"
            },
            fields: "id"

        }, (err: any, file: any) => {
            if (err) {
                console.error(err);
                return reject(err);
            } else {
                resolve(file);
            }
        })
    })
}

export const actions = {
    addSet: async ({ request, cookies, locals }) => {
        const formData = await request.formData();

        const name = formData.get("name")?.toString();
        const description = formData.get("description")?.toString();
        const price = formData.get("price")?.toString();
        const setNumber = formData.get("setNumber")?.toString();
        const partsAmount = formData.get("partsAmount")?.toString();
        const themeId = formData.get("themeId")?.toString();
        const yearReleased = formData.get("yearReleased")?.toString();
        const yearBought = formData.get("yearBought")?.toString();
        const isBought = !!formData.get("isBought");

        await authorize().then(auth => {
            const legoSetName = (name || "lego-thumbnail") + new Date().getMilliseconds();
            const file = formData.get("imageThumbnail")

            uploadFile(auth, legoSetName, file)
                .then(uploadResult => {
                    console.log(uploadResult.data.id)
                })
                .catch(console.error)
        })
            .catch(console.error)

        let newSet = await fetch("http://localhost:3000/api/v1/sets/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": locals.session?.toString() || ""
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

        return {
            success: await newSet.text()
        }

    }
} satisfies Actions;