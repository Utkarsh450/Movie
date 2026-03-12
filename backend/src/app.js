const express = require("express")
const app = express();
const cors = require("cors")
const CookieParser = require("cookie-parser")
const authRoutes = require("../src/routes/auth.routes")

app.use(express.json());
app.use(CookieParser());

const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(cors({
    origin: allowedOrigin,
    credentials: true
}));


app.use("/api/auth", authRoutes);



module.exports = app;
