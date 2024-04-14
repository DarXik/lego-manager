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
const post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body || !req.headers.authorization) {
        return res.send(false).status(404);
    }
    const verifiedUser = (0, userAuthentication_1.verifyUser)(req.headers.authorization);
    console.log("user check: ", verifiedUser);
    if (!verifiedUser.user || verifiedUser.token !== verifiedUser.user.customId || !verifiedUser) {
        return res.send(false).status(404);
    }
    else {
        return res.send(true).status(200);
    }
});
exports.default = { post };
