"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import connectDB from "./config/db";
const Sets_1 = __importDefault(require("./routes/api/v1/set/Sets"));
const User_1 = __importDefault(require("./routes/user/login/User"));
const User_2 = __importDefault(require("./routes/user/register/User"));
const Search_1 = __importDefault(require("./routes/api/v1/search/Search"));
const Add_1 = __importDefault(require("./routes/api/v1/add/Add"));
const User_3 = __importDefault(require("./routes/user/check/User"));
const Image_1 = __importDefault(require("./routes/api/v1/image/Image"));
const Instructions_1 = __importDefault(require("./routes/api/v1/instructions/Instructions"));
const Delete_1 = __importDefault(require("./routes/api/v1/delete/Delete"));
const Edit_1 = __importDefault(require("./routes/api/v1/edit/Edit"));
const User_4 = __importDefault(require("./routes/user/logout/User"));
const User_5 = __importDefault(require("./routes/user/update/User"));
const multer_1 = __importDefault(require("multer"));
// import fileupload from "express-fileupload"
const upload = (0, multer_1.default)();
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use(express.static("public"))
// app.use(fileupload())
app.use("/user/check", User_3.default);
app.use("/user/login", User_1.default);
app.use("/user/register", User_2.default);
app.use("/user/logout", User_4.default);
app.use("/user/update", User_5.default);
app.use("/api/v1/sets", Sets_1.default);
app.use("/api/v1/sets/add", upload.any(), Add_1.default);
app.use("/api/v1/sets/delete", Delete_1.default);
app.use("/api/v1/sets/search", Search_1.default);
app.use("/api/v1/sets/edit", upload.any(), Edit_1.default);
app.use("/api/v1/image", Image_1.default);
app.use("/api/v1/instructions", Instructions_1.default);
app.get("/", (req, res) => {
    res.send("Lego Manager API v1");
});
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
