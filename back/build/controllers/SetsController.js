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
        return res.status(400).send({ message: "something is missing" });
    }
    const verifiedUser = yield (0, userAuthentication_1.verifyUser)(req.headers.authorization.toString());
    console.log("sets for user: ", verifiedUser.user.username);
    if (!verifiedUser.user || !verifiedUser.token) {
        return res.status(404).send({ message: "user not found" });
    }
    try {
        const sets = yield prisma_1.default.sets.findMany({ where: { ownedBy: verifiedUser.user.id } });
        if (!sets || sets.length == 0) {
            return res.status(404).send({ message: "sets not found" });
        }
        return res.status(200).send(sets);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ message: "sets could not be found" });
    }
});
exports.default = { get };
