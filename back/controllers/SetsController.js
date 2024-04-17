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
const userAuthentication_1 = require("../services/userAuthentication");
const Set_1 = require("../models/Set");
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization) {
        return res.send("something is missing").status(400);
    }
    const verifiedUser = yield (0, userAuthentication_1.verifyUser)(req.headers.authorization.toString());
    console.log(verifiedUser);
    if (!verifiedUser.user || !verifiedUser.token) {
        return res.send({ message: "user not found" }).status(404);
    }
    const resSetJSON = yield Set_1.Set.find({ ownedBy: verifiedUser.user._id });
    console.log(resSetJSON);
    return res.send(resSetJSON).status(200);
    // res.send(resSetJSON.results.map((set: any) => ({
    //     setNumber: set.set_num,
    //     name: set.name,
    //     yearReleased: set.year,
    // }))).status(200);
});
exports.default = { get };
