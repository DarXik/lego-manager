import express from "express";
import connectDB from "./config/db";
import setsRoute from "./routes/api/v1/Sets";
import loginRoute from "./routes/user/login/User"
import registerRoute from "./routes/user/register/User"

const app = express();
const PORT = 3000;

connectDB();

app.use(express.json())

app.use("/api/v1/sets", setsRoute);
app.use("/user/login", loginRoute);
app.use("/user/register", registerRoute)

app.get("/", (req, res) => {
    res.send("Lego Štěpán API v1.0.0")
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})