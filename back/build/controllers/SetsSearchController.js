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
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.query || !req.headers.authorization) {
        return res.status(400).send({ message: "something is missing" });
    }
    const verifiedUser = yield (0, userAuthentication_1.verifyUser)(req.headers.authorization.toString());
    if (!verifiedUser.user || !verifiedUser.token) {
        return res.status(404).send({ message: "user not found" });
    }
    const query = req.params.query;
    try {
        // poslat i theme name
        // console.log("searching for: ", set)
        const headers = {
            'Accept': 'application/json',
            'Authorization': 'key fea25735873965685e52dfba8ad25aa8'
        };
        const responseRebrickableSet = yield fetch(`https://rebrickable.com/api/v3/lego/sets/?page=1&page_size=50&search=${query}`, {
            method: 'GET',
            headers: headers
        });
        const mySets = yield prisma_1.default.sets.findMany({ where: {} });
        let matchedSeats = mySets.filter((set) => set.name.toLowerCase().includes(query.toLowerCase())
            || set.setNumber.toLowerCase().includes(query.toLowerCase())
            || set.themeName.toLowerCase().includes(query.toLowerCase()));
        const resSetJSON = yield responseRebrickableSet.json();
        // console.log("mySets: ", matchedSeats)
        let finalSets = [
            ...matchedSeats.map((set) => ({
                setNumber: set.setNumber,
                name: set.name,
                yearReleased: set.yearReleased,
                numParts: set.partsAmount,
                themeName: set.themeName,
                addedBy: set.addedById
            })),
            ...resSetJSON.results.map((set) => ({
                setNumber: set.set_num,
                name: set.name,
                yearReleased: set.year,
                numParts: set.num_parts,
                addedBy: null
            }))
        ];
        if (finalSets.length > 0) {
            res.status(200).send(finalSets);
        }
        else {
            res.status(404).send({ message: "sets not found" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "couldn't fetch from db" });
    }
});
exports.default = { get };
