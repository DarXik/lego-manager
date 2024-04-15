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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = require("bcrypt");
const uuid_1 = require("uuid");
const userSchema = new mongoose_1.Schema({
    customId: {
        type: String,
        unique: true,
        required: true,
        default: () => (0, uuid_1.v4)()
    },
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    sets: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'sets'
    },
    sessions: {
        type: [String],
    }
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield (0, bcrypt_1.hash)(this.password, 10);
        // this.customId = uuidv4()
        next();
    });
});
userSchema.method("isValidPassword", function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, bcrypt_1.compare)(password, this.password);
    });
});
exports.User = (0, mongoose_1.model)('users', userSchema);
