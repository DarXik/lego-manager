"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const setSchema = new mongoose_1.Schema({
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
    imageUrl: {
        type: [String],
        required: true
    },
    instructionsUrl: {
        type: String,
        required: true
    },
    ownedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
});
const Set = (0, mongoose_1.model)('sets', setSchema);
