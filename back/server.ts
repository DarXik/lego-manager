import express from "express";
// import connectDB from "./config/db";
import setsRoute from "./routes/api/v1/Sets";
import loginRoute from "./routes/user/login/User"
import registerRoute from "./routes/user/register/User"
import setsSearchRoute from "./routes/api/v1/search/Search"
import setsAddRoute from "./routes/api/v1/add/Add"
import userCheckRoute from "./routes/user/check/User"
import multer from "multer";

const uplaod = multer()
const app = express();
const PORT = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1/sets", setsRoute);
app.use("/user/login", loginRoute);
app.use("/user/register", registerRoute);
app.use("/api/v1/sets/search", setsSearchRoute);
app.use("/api/v1/sets/add", uplaod.single("imageThumbnail"), setsAddRoute);
app.use("/user/check", userCheckRoute)

app.get("/", (req, res) => {
    res.send("Lego Manager API v1")
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})