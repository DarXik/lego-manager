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
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ dest: "uploads/" });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // počáteční kontrola
    if (!req.body || !req.headers.authorization) {
        return res.status(400).send({ message: "something is missing" });
    }
    const verifiedUser = yield (0, userAuthentication_1.verifyUser)(req.headers.authorization.toString());
    if (!verifiedUser.user || !verifiedUser.token) {
        return res.status(404).send({ message: "user not found" });
    }
    const userSet = yield req.body;
    console.log(userSet);
    let newImageFilename;
    let newPDFFilenames = [];
    // pokud nahrál image/manual
    if (req.files || req.file) {
        console.log(req.files);
        // kontrola a uložení souboru
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
                        const filename = `${(0, uniqid_1.default)()}-${files[key].originalname.split(".")[0]}${ext}`;
                        newPDFFilenames.push(filename);
                        const filePath = path_1.default.join(__dirname, `../../uploads/instructions/${filename}`);
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
        // let newThemeName;
        // let newThemeId;
        // if (userSet.themeId && !userSet.themeName) {
        //     try {
        //         const themeName = await fetch(`https://rebrickable.com/api/v3/lego/themes/${userSet.themeId}`, {
        //             method: 'GET',
        //             headers: {
        //                 'Accept': 'application/json',
        //                 'Authorization': 'key fea25735873965685e52dfba8ad25aa8'
        //             }
        //         })
        //         if (themeName.ok) {
        //             newThemeName = (await themeName.json()).name
        //             newThemeId = userSet.themeId
        //         }
        //         else {
        //             console.log("theme not found")
        //             newThemeName = ""
        //             newThemeId = userSet.themeId
        //         }
        //     }
        //     catch (err) {
        //         console.log(err)
        //         newThemeName = ""
        //         newThemeId = userSet.themeId
        //     }
        // }
        // else if (!userSet.themeId && userSet.themeName) {
        //     const themeId = await fetch('https://rebrickable.com/api/v3/lego/themes/?page=1&page_size=1000', {
        //         method: 'GET',
        //         headers: {
        //             'Accept': 'application/json',
        //             'Authorization': 'key fea25735873965685e52dfba8ad25aa8'
        //         }
        //     })
        //     if (themeId.ok) {
        //         newThemeId = (await themeId.json()).results.find((theme: any) => theme.name == userSet.themeName).id ? (await themeId.json()).results.find((theme: any) => theme.name == userSet.themeName).id : 1000
        //         newThemeName = userSet.themeName
        //     }
        // }
        // else{
        //     newThemeName = ""
        //     newThemeId = 1000
        // }
        // uložení a vytvoření setu
        let set = yield prisma_1.default.sets.findUnique({ where: { setNumber: userSet.setNumber } });
        if (!set) {
            try {
                let newSet = yield prisma_1.default.sets.create({
                    data: {
                        setNumber: userSet.setNumber,
                        name: userSet.name,
                        yearReleased: parseInt(userSet.yearReleased),
                        partsAmount: parseInt(userSet.partsAmount),
                        // themeId: parseInt(userSet.themeId),
                        themeName: userSet.themeName,
                        addedBy: { connect: { id: verifiedUser.user.id } },
                        usedBy: { connect: { id: verifiedUser.user.id } },
                    }
                });
                let newAttachment = yield prisma_1.default.setAttachment.create({
                    data: {
                        description: (userSet === null || userSet === void 0 ? void 0 : userSet.description) || null,
                        yearBought: parseInt(userSet === null || userSet === void 0 ? void 0 : userSet.yearBought) || null,
                        price: parseInt(userSet === null || userSet === void 0 ? void 0 : userSet.price) || null,
                        image: newImageFilename || null,
                        addedBy: { connect: { id: verifiedUser.user.id } },
                        set: { connect: { id: newSet.id } }
                    }
                });
                let newInstructions = yield prisma_1.default.instructions.createMany({
                    data: newPDFFilenames.map((filename) => {
                        return {
                            instructions: filename,
                            addedById: verifiedUser.user.id,
                            setId: newSet.id,
                            attachmentId: newAttachment.id
                        };
                    })
                });
                if (newSet && newAttachment && newInstructions) {
                    res.status(201).send({ message: "set added" });
                }
                else {
                    res.status(503).send({ message: "set could not be added" });
                }
            }
            catch (err) {
                console.log(err);
                return res.status(500).send({ message: "set could not be saved" });
            }
        }
        else {
            try {
                let newSet = yield prisma_1.default.sets.update({
                    where: { id: set.id },
                    data: {
                        usedBy: { connect: { id: verifiedUser.user.id } },
                    }
                });
                let newAttachment = yield prisma_1.default.setAttachment.create({
                    data: {
                        description: (userSet === null || userSet === void 0 ? void 0 : userSet.description) || null,
                        yearBought: parseInt(userSet === null || userSet === void 0 ? void 0 : userSet.yearBought) || null,
                        price: parseInt(userSet === null || userSet === void 0 ? void 0 : userSet.price) || null,
                        image: newImageFilename || null,
                        addedBy: { connect: { id: verifiedUser.user.id } },
                        set: { connect: { id: set.id } }
                    }
                });
                if (newPDFFilenames.length > 0) {
                    let newInstructions = yield prisma_1.default.instructions.createMany({
                        data: newPDFFilenames.map((filename) => {
                            return {
                                instructions: filename,
                                addedById: verifiedUser.user.id,
                                setId: set.id,
                                attachmentId: newAttachment.id
                            };
                        })
                    });
                }
                if (newSet && newAttachment) {
                    res.status(201).send({ message: "set added" });
                }
                else {
                    res.status(503).send({ message: "set could not be added" });
                }
            }
            catch (err) {
                console.log(err);
                return res.status(500).send({ message: "set could not be saved" });
            }
        }
    }
    catch (e) {
        console.log(e);
        res.status(503).send({ message: "set could not be added" });
    }
});
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
    try {
        let set = yield prisma_1.default.sets.update({
            where: { id: setId },
            data: {
                usedBy: { disconnect: { id: verifiedUser.user.id } },
            }
        });
        let setAttachment = yield prisma_1.default.setAttachment.deleteMany({
            where: { set: { id: set.id }, addedBy: { id: verifiedUser.user.id } }
        });
        let instructions = yield prisma_1.default.instructions.deleteMany({
            where: { set: { id: set.id }, addedBy: { id: verifiedUser.user.id } }
        });
        // let user = await prisma.users.update({
        //     where: { id: verifiedUser.user.id },
        //     data: {
        //         usedSets: { disconnect: { id: set.id } },
        //         setAttachments: { disconnect: { id: setAttachment.id } },
        //     }
        // })
        if (set && setAttachment && instructions) {
            res.status(200).send({ message: "set deleted" });
        }
        else {
            res.status(503).send({ message: "set could not be deleted" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ message: "set could not be deleted" });
    }
});
exports.default = { post, deleteSet };
