import type { Actions } from './$types';
import { v2 as cloudinary } from 'cloudinary';
import {PUBLIC_VITE_CLOUDINARY_API_KEY, PUBLIC_VITE_CLOUDINARY_API_SECRET, PUBLIC_VITE_CLOUDINARY_CLOUD_NAME} from "$env/static/public";

export const actions = {
    addSet: async ({ request, cookies, locals }) => {
        // cloudinary.config({
        //     cloud_name: PUBLIC_VITE_CLOUDINARY_CLOUD_NAME,
        //     api_key: PUBLIC_VITE_CLOUDINARY_API_KEY,
        //     api_secret: PUBLIC_VITE_CLOUDINARY_API_SECRET,
        //     secure: true
        // })

        const formData = await request.formData();
        console.log(formData);

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

        // const image = await cloudinary.uploader.upload(imageThumbnail, {
        //     upload_preset: "lego",
        //     folder: "lego",
        // })

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