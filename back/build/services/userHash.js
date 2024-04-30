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
exports.verifyPassword = exports.hashPassword = void 0;
const bcrypt_1 = require("bcrypt");
const hashPassword = (userPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const password = yield (0, bcrypt_1.hash)(userPassword, 4);
    return password;
});
exports.hashPassword = hashPassword;
const verifyPassword = (userPassword, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const isValid = yield (0, bcrypt_1.compare)(userPassword, hashedPassword);
    console.log("password match: ", isValid);
    return isValid;
});
exports.verifyPassword = verifyPassword;
