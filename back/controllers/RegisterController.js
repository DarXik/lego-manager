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
const post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    if (!req.body.email || !req.body.password) {
        return res.send("email and password are required").status(400);
    }
    if ((yield User_1.User.findOne({ email: req.body.email })) || (yield User_1.User.findOne({ username: req.body.username }))) {
        return res.send("user already exists").status(400);
    }
    const newUser = new User_1.User({
        username: req.body.username ? req.body.username : req.body.email,
        email: req.body.email,
        password: req.body.password
    });
    try {
        if (yield newUser.save()) {
            res.send("user registered").status(201);
        }
        else {
            res.send("user could not be registered").status(503);
        }
    }
    catch (err) {
        res.send("user could not be registered").status(503);
    }
});
exports.default = { post };
