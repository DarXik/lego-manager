import express from "express";
// import connectDB from "./config/db";
import setsRoute from "./routes/api/v1/Sets";
import loginRoute from "./routes/user/login/User"
import registerRoute from "./routes/user/register/User"
import setsSearchRoute from "./routes/api/v1/search/Search"
import setsAddRoute from "./routes/api/v1/add/Add"
import userCheckRoute from "./routes/user/check/User"
import imageRoute from "./routes/api/v1/image/Image"
import instructionsRoute from "./routes/api/v1/instructions/Instructions"
import multer from "multer";
// import fileupload from "express-fileupload"

const upload = multer()
const app = express();
const PORT = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"))
// app.use(fileupload())

app.use("/user/check", userCheckRoute)
app.use("/user/login", loginRoute);
app.use("/user/register", registerRoute);
app.use("/api/v1/sets", setsRoute);
app.use("/api/v1/sets/add", upload.any(), setsAddRoute);
app.use("api/v1/sets/delete", setsAddRoute);
app.use("/api/v1/sets/search", setsSearchRoute);
app.use("/api/v1/image", imageRoute)
app.use("/api/v1/instructions", instructionsRoute);

app.get("/", (req, res) => {
    res.send("Lego Manager API v1")
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})