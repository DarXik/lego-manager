"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const Sets_1 = __importDefault(require("./routes/api/v1/Sets"));
const User_1 = __importDefault(require("./routes/user/login/User"));
const User_2 = __importDefault(require("./routes/user/register/User"));
const app = (0, express_1.default)();
const PORT = 3000;
(0, db_1.default)();
app.use(express_1.default.json());
app.use("/api/v1/sets", Sets_1.default);
app.use("/user/login", User_1.default);
app.use("/user/register", User_2.default);
app.get("/", (req, res) => {
    res.send("Lego Štěpán API v1.0.0");
});
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
