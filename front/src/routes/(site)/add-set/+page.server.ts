import type { Actions } from './$types';
import axios from 'axios';
// import multer from "multer";
// import ImageKit from "imagekit";

// const fileToArrayBuffer = (filePath: string): Promise<ArrayBuffer> => {
//     return new Promise((resolve, reject) => {
//         fs.readFile(filePath, (err, data) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(data.buffer);
//             }
//         });
//     });
// };


export const actions = {
    addSet: async ({ request, cookies, locals }) => {
        const formData = await request.formData();
        // const boundary = formData.getBoundary();

        // var imagekit = new ImageKit({
        //     publicKey: "public_hFsIFiIOg4axObbWKYA91OfgDfk=",
        //     privateKey: "private_Dr0ocLSWUIwBaySyfqdkScBPVFE=",
        //     urlEndpoint: "https://ik.imagekit.io/oaoxuk4he"
        // })

        const name = formData.get("name")?.toString();
        const description = formData.get("description")?.toString();
        const price = formData.get("price")?.toString();
        const setNumber = formData.get("setNumber")?.toString();
        const partsAmount = formData.get("partsAmount")?.toString();
        const themeId = formData.get("themeId")?.toString();
        const yearReleased = formData.get("yearReleased")?.toString();
        const yearBought = formData.get("yearBought")?.toString();
        const isBought = !!formData.get("isBought");
        const imageThumbnail = formData.get("imageThumbnail")?.valueOf() as File;

        // try {
        //     const fileData = await fileToArrayBuffer(imageThumbnail);
        //     const buffer = Buffer.from(fileData);
        //     const resp = await imagekit.upload({
        //         file: buffer,
        //         fileName: `image-thumbnail-${locals.session?.split(".")[0]}-${setNumber}.${imageThumbnail.name.split('.').pop()}`,
        //     })

        //     console.log(resp)
        // }
        // catch (err) {
        //     console.log(err)
        // }

        // console.log(
        //     imageThumbnail?.name,
        //     imageThumbnail?.type,
        //     imageThumbnail?.size,

        // )

        // const arrayBuffer = await imageThumbnail.arrayBuffer();
        // const buffer = Buffer.from(arrayBuffer);

        // console.log(buffer)

        // let newSet = await fetch("http://localhost:3000/api/v1/sets/add", {
        //     method: "POST",
        //     headers: {
        //         "Authorization": locals.session?.toString() || "",
        //         'Content-Type': `multipart/form-data; boundary=${boundary}`
        //     },
        //     body: formData

        // })

        const newSet = await axios({
            url: "http://localhost:3000/api/v1/sets/add",
            method: "POST",
            headers: {
                "Authorization": locals.session?.toString() || "",
                'Content-Type': `multipart/form-data`
            },
            data: formData
        })

        return {
            // success: await newSet.text()
        }

    }
} satisfies Actions;