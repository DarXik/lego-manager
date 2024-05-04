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
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const deleteSet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // počáteční kontrola
    if (!req.params.id || !req.headers.authorization) {
        return res.status(400).send({ message: "something is missing" });
    }
    const verifiedUser = yield (0, userAuthentication_1.verifyUser)(req.headers.authorization.toString());
    if (!verifiedUser.user || !verifiedUser.token) {
        return res.status(404).send({ message: "user not found" });
    }
    let setId = req.params.id;
    console.log("set to delete: ", setId);
    try {
        yield prisma_1.default.users.update({
            where: { id: verifiedUser.user.id },
            data: {
                usedSets: { disconnect: [{ id: setId }] },
            }
        });
        // let attachment = await prisma.setAttachment.findFirst({
        //     where: {
        //         setId: setId,
        //         addedById: verifiedUser.user.id
        //     }
        // })
        // await prisma.setAttachment.deleteMany({
        //     where: {
        //         setId: setId,
        //         addedById: verifiedUser.user.id
        //     }
        // })
        // if (attachment?.image) {
        //     try {
        //         await fs.unlink(path.join(__dirname, `../../uploads/images/${attachment?.image}`))
        //     }
        //     catch (err) {
        //         console.log(err)
        //         return res.status(500).send({ message: "image could not be deleted" })
        //     }
        // }
        let instructions = yield prisma_1.default.instructions.findFirst({
            where: {
                setId: setId,
                addedById: verifiedUser.user.id
            }
        });
        yield prisma_1.default.instructions.deleteMany({
            where: {
                setId: setId,
                addedById: verifiedUser.user.id
            }
        });
        if (instructions === null || instructions === void 0 ? void 0 : instructions.instructions) {
            try {
                let file = path_1.default.join(__dirname, `../../uploads/instructions/${instructions === null || instructions === void 0 ? void 0 : instructions.instructions}`);
                console.log("file do delete: ", file);
                yield promises_1.default.unlink(file);
            }
            catch (err) {
                console.log(err);
                return res.status(500).send({ message: "pdf could not be deleted" });
            }
        }
        res.status(200).send({ message: "set deleted" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ message: "set could not be deleted" });
    }
});
exports.default = { deleteSet };
