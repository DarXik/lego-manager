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
Object.defineProperty(exports, "__esModule", { value: true });
const Set_1 = require("../models/Set");
const userAuthentication_1 = require("../services/userAuthentication");
const User_1 = require("../models/User");
const post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body || !req.headers.authorization) {
        return res.send("something is missing").status(400);
    }
    const verifiedUser = (0, userAuthentication_1.verifyUser)(req.headers.authorization.toString());
    if (!verifiedUser.user || !verifiedUser.token) {
        return res.send("user not found").status(404);
    }
    const set = yield req.body.json();
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
            console.log("theme not found");
        }
        catch (e) {
            console.log(e);
        }
        const newSet = new Set_1.Set({
            setNumber: set.number,
            name: set.name,
            description: set === null || set === void 0 ? void 0 : set.description,
            partsAmount: set.partsAmount,
            themeId: set.themeId,
            themeName: resThemeName,
            yearReleased: set === null || set === void 0 ? void 0 : set.year,
            bought: set === null || set === void 0 ? void 0 : set.bought,
            yearBought: set === null || set === void 0 ? void 0 : set.yearBought,
            price: set === null || set === void 0 ? void 0 : set.price,
            imageThumbnailUrl: set === null || set === void 0 ? void 0 : set.imageThumbnailUrl,
            instructionsUrl: set === null || set === void 0 ? void 0 : set.instructionsUrl,
            ownedBy: verifiedUser.user
        });
        try {
            if (yield newSet.save()) {
                if (yield User_1.User.updateOne({ customId: verifiedUser.user.customId }, { $push: { sets: newSet } })) {
                    res.send("set added").status(201);
                }
                else {
                    res.send("set could not be added").status(503);
                }
            }
            else {
                res.send("set could not be added").status(503);
            }
        }
        catch (err) {
            res.send("set could not be added").status(503);
        }
    }
    catch (e) {
        console.log(e);
    }
});
exports.default = { post };
