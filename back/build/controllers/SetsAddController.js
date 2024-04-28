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
const uniqid_1 = __importDefault(require("uniqid"));
const uuid_1 = require("uuid");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ dest: "uploads/" });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body || !req.headers.authorization) {
        return res.status(400).send({ message: "something is missing" });
    }
    const verifiedUser = yield (0, userAuthentication_1.verifyUser)(req.headers.authorization.toString());
    if (!verifiedUser.user || !verifiedUser.token) {
        return res.status(404).send({ message: "user not found" });
    }
    const set = yield req.body;
    console.log(set);
    let newImageFilename;
    let newPDFFilename;
    if (req.files || req.file) {
        console.log(req.files);
        try {
            const files = req.files || req.file;
            const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.JPG', '.JPEG', '.PNG', '.GIF', '.WEBP', '.svg', '.SVG', '.pdf', '.PDF'];
            for (const key in files) {
                const ext = path_1.default.extname(files[key].originalname).toLowerCase();
                if (!allowedExtensions.includes(ext)) {
                    console.log("extension not allowed");
                    return res.status(500).send({ message: "extension not allowed" });
                }
                if (ext == ".pdf" || ext == ".PDF" && files[key].mimetype == "application/pdf") {
                    try {
                        newPDFFilename = `${(0, uniqid_1.default)()}-${files[key].originalname.split(".")[0]}${ext}`;
                        const filePath = path_1.default.join(__dirname, `../../uploads/instructions/${newPDFFilename}`);
                        yield fs_1.default.promises.writeFile(filePath, files[key].buffer);
                    }
                    catch (err) {
                        console.log(err);
                        return res.status(500).send({ message: "pdf could not be saved" });
                    }
                }
                else {
                    try {
                        newImageFilename = `${(0, uniqid_1.default)()}-${files[key].originalname.split(".")[0]}${ext}`;
                        const filePath = path_1.default.join(__dirname, `../../uploads/images/${newImageFilename}`);
                        yield fs_1.default.promises.writeFile(filePath, files[key].buffer);
                    }
                    catch (err) {
                        console.log(err);
                        return res.status(500).send({ message: "image could not be saved" });
                    }
                }
            }
            // }
        }
        catch (err) {
            console.log(err);
            return res.status(500).send({ message: "image could not be saved" });
        }
    }
    try {
        let resThemeName = "Custom"; // dodělat od usera
        const headers = {
            'Accept': 'application/json',
            'Authorization': 'key fea25735873965685e52dfba8ad25aa8'
        };
        try {
            const responseTheme = yield fetch(`https://rebrickable.com/api/v3/lego/themes/${set.themeId}`, {
                method: 'GET',
                headers: headers
            });
            if (responseTheme.ok) {
                resThemeName = (yield responseTheme.json()).name;
            }
            else {
                console.log("theme not found");
            }
        }
        catch (e) {
            console.log(e);
        }
        const newSet = yield prisma_1.default.sets.create({
            data: {
                id: (0, uuid_1.v4)(),
                setNumber: parseInt(set.setNumber),
                name: set.name,
                description: set.description || null, // failuje pro čj
                partsAmount: parseInt(set.partsAmount),
                themeId: parseInt(set.themeId),
                themeName: resThemeName,
                yearReleased: parseInt(set.yearReleased) || null,
                bought: (set.isBought == "on" ? true : false) || null,
                yearBought: parseInt(set.yearBought) || null,
                price: parseInt(set.price) || null,
                imageThumbnail: newImageFilename || null,
                instructions: newPDFFilename || null,
                ownedBy: verifiedUser.user.id,
                addedOn: new Date()
            }
        });
        console.log("new set: ", newSet);
        try {
            if (newSet) {
                if (yield prisma_1.default.users.update({
                    where: {
                        id: verifiedUser.user.id
                    },
                    data: {
                        sets: {
                            sets: [...verifiedUser.user.sets.sets, newSet.id]
                        }
                    }
                })) {
                    res.status(201).send({ message: "set added" });
                }
                else {
                    res.status(503).send({ message: "set could not be added 1" });
                }
            }
            else {
                res.status(503).send({ message: "set could not be added 2" });
            }
        }
        catch (err) {
            console.log(err);
            res.status(503).send({ message: "set could not be added 3" });
        }
    }
    catch (e) {
        console.log(e);
        res.status(503).send({ message: "set could not be added 4" });
    }
});
exports.default = { post };
