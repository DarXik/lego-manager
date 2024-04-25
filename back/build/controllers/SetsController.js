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
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization) {
        return res.send("something is missing").status(400);
    }
    const verifiedUser = yield (0, userAuthentication_1.verifyUser)(req.headers.authorization.toString());
    console.log(verifiedUser);
    if (!verifiedUser.user || !verifiedUser.token) {
        return res.send({ message: "user not found" }).status(404);
    }
    try {
        const sets = yield prisma_1.default.sets.findMany({ where: { ownedBy: verifiedUser.user.id } });
        if (!sets || sets.length == 0) {
            return res.send({ message: "sets not found" }).status(404);
        }
        const setsWithImages = [];
        for (const set of sets) {
            const image = yield prisma_1.default.images.findUnique({ where: { id: set.imageThumbnail } });
            if (!image) {
                console.error("image not found for set: ", set.imageThumbnail);
                continue;
            }
            const setWithImage = Object.assign(Object.assign({}, set), { imageThumbnail: image });
            setsWithImages.push(setWithImage);
        }
        return res.send(setsWithImages).status(200);
    }
    catch (err) {
        console.log(err);
        return res.send({ message: "sets could not be found" }).status(500);
    }
});
exports.default = { get };
