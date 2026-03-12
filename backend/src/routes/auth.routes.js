const express = require("express");
const { Login, Register, Logout, Me } = require("../controllers/auth.controllers");
const ProtectedMiddleware = require("../middlewares/Protected");
const router = express.Router();

router.post("/login", Login)
router.post("/register", Register)

router.get("/@me", ProtectedMiddleware, Me)

router.get("/logout", Logout)
module.exports = router;
