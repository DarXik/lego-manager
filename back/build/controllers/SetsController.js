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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userAuthentication_1 = require("../services/userAuthentication");
const prisma_1 = __importDefault(require("../config/prisma"));
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // počáteční kontrla
    if (!req.headers.authorization) {
        return res.status(400).send({ message: "something is missing" });
    }
    const verifiedUser = yield (0, userAuthentication_1.verifyUser)(req.headers.authorization.toString());
    if (!verifiedUser.user || !verifiedUser.token) {
        return res.status(404).send({ message: "user not found" });
    }
    // všechny sety
    if (!req.params.id) {
        // console.log("sets for user: ", verifiedUser.user.username);
        try {
            const sets = yield prisma_1.default.sets.findMany({ where: { usedBy: { some: { id: verifiedUser.user.id } } } });
            const attachment = yield prisma_1.default.setAttachment.findMany({ where: { setId: { in: sets.map((set) => set.id) }, addedById: verifiedUser.user.id } });
            // console.log(attachment)
            if (!sets || sets.length == 0) {
                return res.status(404).send({ message: "sets not found" });
            }
            const setsSmaller = sets.map((set) => {
                var _a, _b;
                return {
                    id: set.id,
                    name: set.name,
                    setNumber: set.setNumber,
                    themeName: set.themeName,
                    addedOn: ((_a = attachment.find((attachment) => attachment.setId == set.id)) === null || _a === void 0 ? void 0 : _a.addedOn) || null,
                    yearBought: ((_b = attachment.find((attachment) => attachment.setId == set.id)) === null || _b === void 0 ? void 0 : _b.yearBought) || null,
                };
            });
            return res.status(200).send(setsSmaller);
        }
        catch (err) {
            console.log(err);
            return res.status(500).send({ message: "sets could not be found" });
        }
    }
    // jeden specifický set
    else {
        // console.log("looking for set: ", req.params.id);
        try {
            const set = yield prisma_1.default.sets.findUnique({ where: { id: req.params.id, usedBy: { some: { id: verifiedUser.user.id } } } });
            const attachment = yield prisma_1.default.setAttachment.findFirst({ where: { setId: set === null || set === void 0 ? void 0 : set.id, addedById: verifiedUser.user.id } });
            const myInstructions = yield prisma_1.default.instructions.findMany({
                where: {
                    setId: set === null || set === void 0 ? void 0 : set.id,
                    addedById: verifiedUser.user.id,
                    set: { usedBy: { some: { id: verifiedUser.user.id } } }
                }
            });
            const allInstructions = yield prisma_1.default.instructions.findMany({
                where: {
                    setId: set === null || set === void 0 ? void 0 : set.id,
                    addedById: { not: verifiedUser.user.id },
                    set: { usedBy: { some: { id: verifiedUser.user.id } } }
                }
            });
            // console.log(myInstructions)
            // console.log(allInstructions)
            if (!set || !attachment) {
                return res.status(404).send({ message: "set not found" });
            }
            if (attachment && set) {
                const { id, addedById } = attachment, rest = __rest(attachment, ["id", "addedById"]);
                return res.status(200).send(Object.assign(Object.assign(Object.assign({}, set), rest), { attachmentId: id, attachmentAddedById: addedById, allInstructions: allInstructions, myInstructions: myInstructions }));
            }
        }
        catch (err) {
            console.log(err);
            return res.status(500).send({ message: "set could not be found" });
        }
    }
});
exports.default = { get };
