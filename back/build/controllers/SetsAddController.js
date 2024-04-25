"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userAuthentication_1 = require("../services/userAuthentication");
const prisma_1 = __importDefault(require("../config/prisma"));
const uniqid_1 = __importDefault(require("uniqid"));
const uuid_1 = require("uuid");
function saveImage(fileBuffer, user, fileType, originalName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const image = yield prisma_1.default.images.create({
                data: {
                    filename: originalName.split(".")[0] + "-" + (0, uniqid_1.default)(),
                    mimetype: fileType,
                    imageThumbnail: fileBuffer.toString("base64"),
                    addedBy: user
                }
            });
            return image;
        }
        catch (err) {
            console.log(err);
        }
    });
}
const post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body || !req.headers.authorization) {
        return res.send("something is missing").status(400);
    }
    const verifiedUser = yield (0, userAuthentication_1.verifyUser)(req.headers.authorization.toString());
    if (!verifiedUser.user || !verifiedUser.token) {
        return res.send("user not found").status(404);
    }
    const set = yield req.body;
    const fileBuffer = yield req.file;
    console.log("adding set: ", set);
    console.log("file: ", {
        name: fileBuffer === null || fileBuffer === void 0 ? void 0 : fileBuffer.originalname,
        type: fileBuffer === null || fileBuffer === void 0 ? void 0 : fileBuffer.mimetype,
        size: fileBuffer === null || fileBuffer === void 0 ? void 0 : fileBuffer.size
    });
    let newImage;
    if (fileBuffer) {
        try {
            newImage = yield saveImage(fileBuffer === null || fileBuffer === void 0 ? void 0 : fileBuffer.buffer, verifiedUser.user.id, fileBuffer === null || fileBuffer === void 0 ? void 0 : fileBuffer.mimetype, fileBuffer === null || fileBuffer === void 0 ? void 0 : fileBuffer.originalname);
        }
        catch (err) {
            console.log(err);
        }
    }
    try {
        let resThemeName = "Custom"; // dodělat od usera
        const headers = {
            'Accept': 'application/json',
            'Authorization': 'key fea25735873965685e52dfba8ad25aa8'
        };
        try {
            const responseTheme = yield fetch(`https://rebrickable.com/api/v3/lego/themes/${set.themeId}`, {
                method: 'GET',
                headers: headers
            });
            if (responseTheme.ok) {
                resThemeName = (yield responseTheme.json()).name;
            }
            else {
                console.log("theme not found");
            }
        }
        catch (e) {
            console.log(e);
        }
        const newSet = yield prisma_1.default.sets.create({
            data: {
                id: (0, uuid_1.v4)(),
                setNumber: parseInt(set.setNumber),
                name: set.name,
                description: set.description || null,
                partsAmount: parseInt(set.partsAmount),
                themeId: parseInt(set.themeId),
                themeName: resThemeName,
                yearReleased: parseInt(set.yearReleased) || null,
                bought: (set.isBought == "on" ? true : false) || null,
                yearBought: parseInt(set.yearBought) || null,
                price: parseInt(set.price) || null,
                imageThumbnail: (newImage === null || newImage === void 0 ? void 0 : newImage.id) || null,
                instructionsUrl: set.instructionsUrl || null,
                ownedBy: verifiedUser.user.id,
                addedOn: new Date()
            }
        });
        console.log("new set: ", newSet);
        try {
            if (newSet) {
                if (yield prisma_1.default.users.update({
                    where: {
                        id: verifiedUser.user.id
                    },
                    data: {
                        sets: {
                            sets: [...verifiedUser.user.sets.sets, newSet.id]
                        }
                    }
                })) {
                    res.send("set added").status(201);
                }
                else {
                    res.send("set could not be added 1").status(503);
                }
            }
            else {
                res.send("set could not be added 2").status(503);
            }
        }
        catch (err) {
            console.log(err);
            res.send("set could not be added 3").status(503);
        }
    }
    catch (e) {
        console.log(e);
        res.send("set could not be added 4").status(503);
    }
});
exports.default = { post };
