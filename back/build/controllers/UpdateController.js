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
const userHash_1 = require("../services/userHash");
const patch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization || !req.body) {
        return res.status(400).send({ message: "something is missing" });
    }
    const verifiedUser = yield (0, userAuthentication_1.verifyUser)(req.headers.authorization.toString());
    if (!verifiedUser.user || !verifiedUser.token) {
        return res.status(404).send({ message: "user not found" });
    }
    if (req.body.currency) {
        console.log(req.body.currency);
        try {
            yield prisma_1.default.users.update({
                where: {
                    id: verifiedUser.user.id
                },
                data: {
                    preferredCurrency: parseInt(req.body.currency)
                }
            });
            console.log("new currency is", req.body.currency);
            return res.status(200).send({ message: "preferred currency updated" });
        }
        catch (err) {
            console.log(err);
            return res.status(500).send({ message: "preferred currency could not be updated" });
        }
    }
    if (req.body.language) {
        try {
            yield prisma_1.default.users.update({
                where: {
                    id: verifiedUser.user.id,
                },
                data: {
                    preferredLanguage: parseInt(req.body.language)
                }
            });
            return res.status(200).send({ message: "preferred language updated" });
        }
        catch (err) {
            console.log(err);
            return res.status(500).send({ message: "preferred language could not be updated" });
        }
    }
    if (req.body.newPassword && req.body.newPasswordRepeat && req.body.currentPassword) {
        try {
            if (req.body.newPassword !== req.body.newPasswordRepeat) {
                return res.status(400).send({ message: "passwords do not match" });
            }
            if (!(yield (0, userHash_1.verifyPassword)(req.body.currentPassword, verifiedUser.user.password))) {
                return res.status(400).send({ message: "current password is incorrect" });
            }
            yield prisma_1.default.users.update({
                where: {
                    id: verifiedUser.user.id
                },
                data: {
                    password: yield (0, userHash_1.hashPassword)(req.body.newPassword)
                }
            });
            return res.status(200).send({ message: "password updated" });
        }
        catch (err) {
            console.log(err);
            return res.status(500).send({ message: "password could not be updated" });
        }
    }
});
exports.default = { patch };
