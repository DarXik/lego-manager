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
const post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    if ((!req.body.email && !req.body.username) || !req.body.password) {
        return res.status(400).send({ message: "something is missing" });
    }
    try {
        const user = yield prisma_1.default.users.findUnique({ where: { email: req.body.email } } || { where: { username: req.body.email } });
        console.log("logging in: ", user);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        if (!(yield (0, userHash_1.verifyPassword)(req.body.password, user.password))) {
            return res.status(401).send({ message: "wrong password" });
        }
        const userSession = (0, userAuthentication_1.createToken)(user.id.toString()).toString();
        try {
            yield prisma_1.default.users.update({
                where: { id: user.id },
                data: {
                    sessions: {
                        create: [{ token: userSession }]
                    }
                }
            });
            console.log("user logged in");
            res.status(200).send({
                session: userSession,
                username: user.username,
                email: user.email,
                preferredCurrency: user.preferredCurrency,
                preferredLanguage: user.preferredLanguage
            });
        }
        catch (err) {
            console.log(err);
            res.status(503).send({ message: "could not be authenticated" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(503).send({ message: "could not be authenticated" });
    }
});
exports.default = { post };
