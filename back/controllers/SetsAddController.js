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
const uuid_1 = require("uuid");
const post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body || !req.headers.authorization) {
        return res.send("something is missing").status(400);
    }
    const verifiedUser = yield (0, userAuthentication_1.verifyUser)(req.headers.authorization.toString());
    console.log(verifiedUser);
    if (!verifiedUser.user || !verifiedUser.token) {
        return res.send("user not found").status(404);
    }
    const set = yield req.body;
    console.log("adding set: ", set);
    try {
        let resThemeName = "unknown"; // dodělat od usera
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
        // const newSet = new Set({
        //     setNumber: parseInt(set.setNumber),
        //     name: set.name,
        //     description: set?.description,
        //     partsAmount: parseInt(set.partsAmount),
        //     themeId: parseInt(set.themeId),
        //     themeName: resThemeName,
        //     yearReleased: parseInt(set?.yearReleased),
        //     bought: set?.isBought,
        //     yearBought: parseInt(set.yearBought),
        //     price: parseInt(set?.price),
        //     imageThumbnailUrl: set?.imageThumbnailUrl,
        //     instructionsUrl: set?.instructionsUrl,
        //     ownedBy: verifiedUser.user
        // })
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
                bought: set.isBought || null,
                yearBought: parseInt(set.yearBought) || null,
                price: parseInt(set.price) || null,
                imageThumbnail: set.imageThumbnail || null,
                instructionsUrl: set.instructionsUrl || null,
                ownedBy: verifiedUser.user.id,
                addedOn: new Date()
            }
        });
        console.log("new set: ", newSet);
        try {
            if (yield newSet) {
                if (yield prisma_1.default.users.update({
                    where: {
                        id: verifiedUser.user.id
                    },
                    data: {
                        sets: {
                            sets: [...verifiedUser.user.sets.sets, newSet]
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
