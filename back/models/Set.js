"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Set = void 0;
const mongoose_1 = require("mongoose");
const setSchema = new mongoose_1.Schema({
    setNumber: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    partsAmount: {
        type: Number,
        required: true
    },
    themeId: {
        type: Number,
        required: true
    },
    themeName: {
        type: String,
        required: true
    },
    yearReleased: {
        type: Number,
    },
    bought: {
        type: Boolean,
    },
    yearBought: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
    },
    imageThumbnailUrl: {
        type: String,
    },
    instructionsUrl: {
        type: String,
    },
    ownedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    addedOn: {
        type: Date,
        default: Date.now
    }
});
exports.Set = (0, mongoose_1.model)('sets', setSchema);
