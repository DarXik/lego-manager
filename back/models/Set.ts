import { Schema, model } from 'mongoose'

interface ISet {
    name: string
    description: string
    theme: string
    released: boolean
    yearReleased: Date
    bought: boolean
    yearBought: Date
    price: number
    imageThumbnailUrl: string
    instructionsUrl: string
    ownedBy: any
}

const setSchema = new Schema<ISet>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    theme: {
        type: String,
        required: true
    },
    released: {
        type: Boolean,
        default: true
    },
    yearReleased: {
        type: Date,
    },
    bought: {
        type: Boolean,
        default: true
    },
    yearBought: {
        type: Date,
    },
    price: {
        type: Number,
    },
    imageThumbnailUrl: {
        type: String,
        required: true
    },
    instructionsUrl: {
        type: String,
        required: true
    },
    ownedBy: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }


})

const Set = model<ISet>('sets', setSchema)