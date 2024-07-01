import express from "express";
import setsRoute from "./routes/api/v1/set/Sets";
import loginRoute from "./routes/user/login/User"
import registerRoute from "./routes/user/register/User"
import setsSearchRoute from "./routes/api/v1/search/Search"
import setsAddRoute from "./routes/api/v1/add/Add"
import userCheckRoute from "./routes/user/check/User"
import imageRoute from "./routes/api/v1/image/Image"
import instructionsRoute from "./routes/api/v1/instructions/Instructions"
import setsDeleteRoute from "./routes/api/v1/delete/Delete"
import setsEditRoute from "./routes/api/v1/edit/Edit"
import logoutRoute from "./routes/user/logout/User"
import updateRoute from "./routes/user/update/User"
import userPreferences from "./routes/user/preferences/User"
import deleteAccountRoute from "./routes/user/delete/User"
import multer from "multer";

const upload = multer()
const app = express();
const PORT = 3000;


app.use(express.json({limit: "500mb"}));
app.use(express.urlencoded({limit: "500mb", extended: true }));

app.use("/user/check", userCheckRoute)
app.use("/user/login", loginRoute);
app.use("/user/register", registerRoute);
app.use("/user/logout", logoutRoute)
app.use("/user/update", updateRoute)
app.use("/user/preferences", userPreferences)
app.use("/user/deleteAccount", deleteAccountRoute)

app.use("/api/v1/sets", setsRoute);
app.use("/api/v1/sets/add", upload.any(), setsAddRoute);
app.use("/api/v1/sets/delete", setsDeleteRoute);
app.use("/api/v1/sets/search", setsSearchRoute);
app.use("/api/v1/sets/edit", upload.any(), setsEditRoute);
app.use("/api/v1/image", imageRoute)
app.use("/api/v1/instructions", instructionsRoute);


app.get("/", (req, res) => {
    res.send("Lego Manager API v1")
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})