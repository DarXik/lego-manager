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
    if (!req.body.email || !req.body.password) {
        return res.send("email and password are required").status(400);
    }
    try {
        const user = yield prisma_1.default.users.findUnique({ where: { email: req.body.email } } || { where: { username: req.body.email } });
        console.log(user);
        if (!user) {
            return res.send("user not found").status(404);
        }
        if (!(yield (0, userHash_1.verifyPassword)(req.body.password, user.password))) {
            return res.send("wrong password").status(401);
        }
        const userSession = (0, userAuthentication_1.createToken)(user.id.toString()).toString();
        console.log(userSession);
        try {
            yield prisma_1.default.users.update({
                where: { id: user.id },
                data: {
                    sessions: {
                        sessions: [...user.sessions.sessions, userSession]
                    }
                }
            });
            res.send({
                session: userSession,
                username: user.username,
                email: user.email,
            }).status(200);
        }
        catch (err) {
            console.log(err);
            res.send("could not be authenticated").status(503);
        }
    }
    catch (err) {
        console.log(err);
        res.send("could not be authenticated").status(503);
    }
});
exports.default = { post };
