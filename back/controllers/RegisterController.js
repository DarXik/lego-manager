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
const uuid_1 = require("uuid");
const userHash_1 = require("../services/userHash");
const prisma_1 = __importDefault(require("../config/prisma"));
function createUser(email, username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma_1.default.users.create({
            data: {
                id: (0, uuid_1.v4)(),
                email: email,
                username: username,
                password: yield (0, userHash_1.hashPassword)(password),
                sessions: { sessions: [] },
                sets: { sets: [] }
            },
        });
        return user;
    });
}
const post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    if (!req.body.email || !req.body.password) {
        console.log("email and password are required");
        return res.send("email and password are required").status(400);
    }
    try {
        if ((yield prisma_1.default.users.findUnique({ where: { email: req.body.email } })) ||
            (yield prisma_1.default.users.findUnique({ where: { username: req.body.username } }))) {
            console.log("user already exists");
            return res.send("user already exists").status(409);
        }
    }
    catch (err) {
        console.log(err);
    }
    try {
        const user = yield createUser(req.body.email, req.body.username ? req.body.username : req.body.email, req.body.password);
        console.log(user);
        if (yield user) {
            console.log("user registered");
            res.send("user registered").status(201);
        }
        else {
            console.log("user could not be registered");
            res.send("user could not be registered").status(503);
        }
    }
    catch (err) {
        console.log("user could not be registered");
        res.send("user could not be registered").status(503);
    }
});
exports.default = { post };
