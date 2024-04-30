// import {model, Schema} from 'mongoose'

// interface ISet {
//     setNumber: number
//     name: string
//     description: string
//     partsAmount: number
//     themeId: number
//     themeName: string
//     yearReleased: number
//     bought: boolean
//     yearBought: number
//     price: number
//     imageThumbnailUrl: string
//     instructionsUrl: string
//     ownedBy: any
//     addedOn: Date
// }

// const setSchema = new Schema<ISet>({
//     setNumber: {
//         type: Number,
//         required: true,
//         unique: true
//     },
//     name: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     description: {
//         type: String,
//     },
//     partsAmount: {
//         type: Number,
//         required: true
//     },
//     themeId: {
//         type: Number,
//         required: true
//     },
//     themeName: {
//         type: String,
//         required: true
//     },
//     yearReleased: {
//         type: Number,
//     },
//     bought: {
//         type: Boolean,
//     },
//     yearBought: {
//         type: Number,
//     },
//     price: {
//         type: Number,
//     },
//     imageThumbnailUrl: {
//         type: String,
//     },
//     instructionsUrl: {
//         type: String,
//     },
//     ownedBy: {
//         type: Schema.Types.ObjectId,
//         ref: 'users',
//         required: true
//     },
//     addedOn: {
//         type: Date,
//         default: Date.now
//     }
// })

// export const Set = model<ISet>('sets', setSchema)