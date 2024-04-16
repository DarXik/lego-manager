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
const User_1 = require("../models/User");
const userAuthentication_1 = require("../services/userAuthentication");
const post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    if (!req.body.email || !req.body.password) {
        return res.send("email and password are required").status(400);
    }
    const user = (yield User_1.User.findOne({ email: req.body.email })) || (yield User_1.User.findOne({ username: req.body.email }));
    if (!user) {
        return res.send("user not found").status(404);
    }
    if (!(yield (user === null || user === void 0 ? void 0 : user.isValidPassword(req.body.password)))) {
        console.log(yield (user === null || user === void 0 ? void 0 : user.isValidPassword(req.body.password)));
        return res.send("wrong password").status(401);
    }
    const userSession = (0, userAuthentication_1.createToken)(user._id.toString()).toString();
    console.log(userSession);
    try {
        yield User_1.User.updateOne({ _id: user._id }, { sessions: [...user.sessions, userSession] });
        res.send({
            session: userSession,
            username: user.username,
            email: user.email,
            sets: user.sets
        }).status(200);
    }
    catch (err) {
        console.log(err);
        res.send("could not be authenticated").status(503);
    }
});
exports.default = { post };
