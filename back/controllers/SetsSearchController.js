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
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.headers.authorization);
    if (!req.query.q || !req.headers.authorization) {
        return res.send("something is missing").status(404);
    }
    const verifiedUser = (0, userAuthentication_1.verifyUser)(req.headers.authorization);
    console.log("verifiedUser: ", yield verifiedUser);
    // if (!verifiedUser.user || verifiedUser.token !== verifiedUser.user.customId || !verifiedUser) {
    //     return res.send("user not found").status(404)
    // }
    const set = yield req.query.q;
    console.log(set);
    try {
        const headers = {
            'Accept': 'application/json',
            'Authorization': 'key fea25735873965685e52dfba8ad25aa8'
        };
        const responseRebrickableSet = yield fetch(`https://rebrickable.com/api/v3/lego/sets/?page=1&page_size=50&search=${set}`, {
            method: 'GET',
            headers: headers
        });
        const resSetJSON = yield responseRebrickableSet.json();
        if (resSetJSON.count > 0) {
            res.send(resSetJSON.results.map((set) => ({
                setNumber: set.set_num,
                name: set.name,
                yearReleased: set.year,
            }))).status(200);
        }
        else {
            res.send("set not found").status(404);
        }
    }
    catch (error) {
        console.log(error);
        res.send("couldn't fetch from db").status(500);
    }
});
exports.default = { get };
