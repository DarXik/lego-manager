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
const patch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // počáteční kontrola
    if (!req.body || !req.headers.authorization) {
        return res.status(400).send({ message: "something is missing" });
    }
    const verifiedUser = yield (0, userAuthentication_1.verifyUser)(req.headers.authorization.toString());
    if (!verifiedUser.user || !verifiedUser.token) {
        return res.status(404).send({ message: "user not found" });
    }
    console.log(yield req.body);
    let set = yield req.body;
    console.log(set);
    try {
        const setAttachment = yield prisma_1.default.setAttachment.findFirst({
            where: {
                set: { id: set === null || set === void 0 ? void 0 : set.setId },
                addedById: verifiedUser.user.id,
            }
        });
        const setAttachmentUpdate = yield prisma_1.default.setAttachment.update({
            where: {
                id: setAttachment === null || setAttachment === void 0 ? void 0 : setAttachment.id,
                addedById: verifiedUser.user.id,
            },
            data: {
                description: set === null || set === void 0 ? void 0 : set.descriptionEdit,
                yearBought: parseInt(set === null || set === void 0 ? void 0 : set.yearBoughtEdit),
                price: parseInt(set === null || set === void 0 ? void 0 : set.priceEdit),
            }
        });
        if (setAttachmentUpdate) {
            res.status(200).send({ message: "set updated" });
        }
        else {
            res.status(503).send({ message: "set could not be updated" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ message: "set could not be updated" });
    }
});
exports.default = { patch };
